import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from map_api.models import USMedicData

class Command(BaseCommand):
    help = 'Ingest Heart & Stroke data (2019-2021) with Gender breakdowns'

    def handle(self, *args, **kwargs):
        # 1. Wipe clean
        USMedicData.objects.all().delete()

        # 2. Path setup
        project_root = os.path.dirname(settings.BASE_DIR)
        file_path = os.path.join(project_root, 'data', 'heart_and_stroke_data.csv') 
    
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return
        
        count = 0
        
        # We want these specific years
        target_years = ['2019', '2020', '2021']
        
        # We want these specific categories
        target_cats = ['Overall', 'Gender']

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                
                # FILTER 1: Year, Category, and ignore National 'US'
                if (row['YearStart'] in target_years and 
                    row['Break_Out_Category'] in target_cats and 
                    row['LocationAbbr'] != 'US'):

                    val = row.get('Data_Value')
                    if not val or not val.strip():
                        continue

                    # Decide what to save in the 'demographic' field
                    # If category is 'Overall', demographic is 'Overall'
                    # If category is 'Gender', demographic is 'Male' or 'Female' (from Break_Out column)
                    demo_value = row['Break_Out'] 

                    # BASIC TOPIC MATCHING
                    if 'Stroke' in row['Topic'] or 'Heart' in row['Topic']:
                        try:
                            USMedicData.objects.create(
                                year=int(row['YearStart']),
                                state_abbr=row['LocationAbbr'],
                                state_name=row['LocationDesc'],
                                topic=row['Topic'],
                                indicator=row['Question'],
                                value=float(val),
                                unit=row['Data_Value_Unit'],
                                demographic=demo_value # Save 'Male', 'Female', or 'Overall'
                            )
                            count += 1
                        except ValueError:
                            continue

                # Safety break if you just want a quick test (remove for full import)
                if count >= 3000:
                    break
        
        self.stdout.write(self.style.SUCCESS(f'Done! Ingested {count} records across 2019-2021.'))
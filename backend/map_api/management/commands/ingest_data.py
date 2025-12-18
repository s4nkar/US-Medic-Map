import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from map_api.models import USMedicData

class Command(BaseCommand):
    help = 'Force ingest 500 Stroke and 500 Heart records from 2020'

    def handle(self, *args, **kwargs):
        # 1. Clear the table first so we don't get duplicates
        USMedicData.objects.all().delete()

        # 2. Find the file
        project_root = os.path.dirname(settings.BASE_DIR)
        file_path = os.path.join(project_root, 'data', 'heart_and_stroke_data.csv') 
    
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return
        
        stroke_count = 0
        heart_count = 0
        limit = 500 # We want 500 of each
        target_year = '2020' # Define the year here

        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # 3. FILTER: Must be 2020 AND not the National 'US' row
                if row['YearStart'] == target_year and row['LocationAbbr'] != 'US':

                    topic = row['Topic']
                    val = row.get('Data_Value')

                    # Skip rows with no data value
                    if not val or not val.strip():
                        continue

                    should_save = False

                    # 4. LOOSE FILTER: If the word 'Stroke' is ANYWHERE in the topic
                    if 'Stroke' in topic and stroke_count < limit:
                        stroke_count += 1
                        should_save = True
                    
                    # 5. LOOSE FILTER: If 'Heart' is ANYWHERE in the topic
                    elif 'Heart' in topic and heart_count < limit:
                        heart_count += 1
                        should_save = True

                    if should_save:
                        try:
                            USMedicData.objects.create(
                                year=int(row['YearStart']),
                                state_abbr=row['LocationAbbr'],
                                state_name=row['LocationDesc'],
                                topic=topic,
                                indicator=row['Question'], 
                                value=float(val),
                                unit=row['Data_Value_Unit']
                            )
                        except ValueError:
                            continue 

                    # 6. Stop when we have enough of both
                    if stroke_count >= limit and heart_count >= limit:
                        break
        
        self.stdout.write(self.style.SUCCESS(f'Done! Ingested {stroke_count} Stroke and {heart_count} Heart records from {target_year}.'))
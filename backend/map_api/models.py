from django.db import models

class USMedicData(models.Model):
    year = models.IntegerField()
    state_abbr = models.CharField(max_length=2)
    state_name = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)       # e.g., 'Stroke' or 'Heart Failure'
    indicator = models.CharField(max_length=255)   # The specific metric
    value = models.FloatField(null=True)           # The percentage/rate
    unit = models.CharField(max_length=50)        # e.g., 'per 100,000'
    
    def __str__(self):
        return f"{self.state_abbr} - {self.indicator} ({self.year})"
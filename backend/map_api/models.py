from django.db import models

class USMedicData(models.Model):
    year = models.IntegerField()
    state_abbr = models.CharField(max_length=2)
    state_name = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)       # 'Stroke' or 'Heart Failure'
    indicator = models.CharField(max_length=255)   # 'Mortality from...'
    value = models.FloatField(null=True)
    unit = models.CharField(max_length=50)
    demographic = models.CharField(max_length=50, default='Overall') 

    def __str__(self):
        return f"{self.state_abbr} - {self.indicator} ({self.year}) - {self.demographic}"
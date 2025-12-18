from rest_framework import serializers
from .models import USMedicData

class USMedicDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = USMedicData
        fields = '__all__'
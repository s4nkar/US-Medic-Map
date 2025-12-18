from rest_framework.views import APIView
from rest_framework.response import Response
from .models import USMedicData
from .serializers import USMedicDataSerializer
from rest_framework import generics
from rest_framework.decorators import api_view

# URL: /api/v1/map/map-data/
class MapDataView(generics.ListAPIView):
    serializer_class = USMedicDataSerializer

    def get_queryset(self):
        # Start with all data
        queryset = USMedicData.objects.all()
        
        # Get parameters from the URL
        topic = self.request.query_params.get('topic')
        indicator = self.request.query_params.get('indicator')
        year = self.request.query_params.get('year')
        demographic = self.request.query_params.get('demographic')

        # Apply filters only if they are provided
        if topic:
            queryset = queryset.filter(topic__icontains=topic)
        if indicator:
            queryset = queryset.filter(indicator__icontains=indicator)
        if year:
            queryset = queryset.filter(year=year)
        if demographic:
            queryset = queryset.filter(demographic=demographic)
            
        return queryset

# URL: /api/v1/map/options/
class FilterOptionsView(APIView):
    def get(self, request):
        # Efficiently grab unique values for the frontend dropdowns
        topics = USMedicData.objects.values_list('topic', flat=True).distinct().order_by('topic')
        indicators = USMedicData.objects.values_list('indicator', flat=True).distinct().order_by('indicator')
        years = USMedicData.objects.values_list('year', flat=True).distinct().order_by('year')
        demographics = USMedicData.objects.values_list('demographic', flat=True).distinct().order_by('demographic')
        
        return Response({
            "topics": list(topics),
            "indicators": list(indicators),
            "years": list(years),
            "demographics": list(demographics)
        })
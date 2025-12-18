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
        queryset = USMedicData.objects.all()

        # Filter options based on already selected values (Cascading)
        topic = request.query_params.get('topic')
        if topic and topic != 'undefined':
            queryset = queryset.filter(topic__icontains=topic)

        # Efficiently grab unique values for the frontend dropdowns based on the filtered set
        topics = USMedicData.objects.values_list('topic', flat=True).distinct().order_by('topic') # Keep topics global or not? Usually better to keep topics global so you can switch. But indicators should be filtered.
        
        # Actually, for the initial load we want everything. 
        # But if 'topic' is provided, we want indicators/years compatible with that topic.
        
        indicators = queryset.values_list('indicator', flat=True).distinct().order_by('indicator')
        years = queryset.values_list('year', flat=True).distinct().order_by('year')
        demographics = queryset.values_list('demographic', flat=True).distinct().order_by('demographic')
        
        # We always want the full list of topics to allow switching
        all_topics = USMedicData.objects.values_list('topic', flat=True).distinct().order_by('topic')

        return Response({
            "topics": list(all_topics),
            "indicators": list(indicators),
            "years": list(years),
            "demographics": list(demographics)
        })
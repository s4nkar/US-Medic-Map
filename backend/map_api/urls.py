from django.urls import path
from .views import MapDataView, FilterOptionsView

app_name = 'map_api'

# URL: /api/v1/map/
urlpatterns = [
    path('map-data/', MapDataView.as_view(), name='map_data'),
    path('options/', FilterOptionsView.as_view(), name='filter_options'),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/v1/map/', include('map_api.urls', namespace='map_api')),
]

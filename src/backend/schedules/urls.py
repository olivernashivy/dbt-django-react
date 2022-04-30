from django.db import router
from django.urls import path, include
from .views import ScheduleCommandViewSet, PeriodictasksViewsets
from rest_framework import routers
# create route for modelviewset
router = routers.DefaultRouter()
router.register(r'schedulecommand', ScheduleCommandViewSet)
router.register(r'Periodictasks', PeriodictasksViewsets)


urlpatterns = [
    path('', include(router.urls)),
]
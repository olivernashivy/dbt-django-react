from django.db import router
from django.urls import path, include
from .views import ScheduleCommandViewSet, PeriodictasksViewsets, ClockedTaskViewsets, IntervalViewsets
from rest_framework import routers
# create route for modelviewset
router = routers.DefaultRouter()
router.register(r'schedulecommand', ScheduleCommandViewSet)
router.register(r'Periodictasks', PeriodictasksViewsets)
router.register(r'ClockedTask', ClockedTaskViewsets)
router.register(r'interval', IntervalViewsets)


urlpatterns = [
    path('', include(router.urls)),
]
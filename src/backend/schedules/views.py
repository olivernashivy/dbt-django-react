from django.shortcuts import render
from django.http import HttpResponse
from .models import ScheduleCommand
from .serializers import ScheduleCommandSerializer, Periodictasksserializer
from rest_framework import viewsets, permissions
from django_celery_beat.models import PeriodicTask
# Create your views here.


class ScheduleCommandViewSet(viewsets.ModelViewSet):
    queryset = ScheduleCommand.objects.all()
    serializer_class = ScheduleCommandSerializer
    permission_classes = [permissions.AllowAny]

class PeriodictasksViewsets(viewsets.ModelViewSet):
    queryset = PeriodicTask.objects.all()
    serializer_class = Periodictasksserializer
    permission_classes = [permissions.AllowAny]

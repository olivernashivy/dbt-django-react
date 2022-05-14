from django.shortcuts import render
from django.http import HttpResponse
from .models import ScheduleCommand, Periodictasks, ClockedTask, interval
from .serializers import ScheduleCommandSerializer, Periodictasksserializer, ClockedTaskSerializer, IntervalSerializer
from rest_framework import viewsets, permissions

# Create your views here.


class ScheduleCommandViewSet(viewsets.ModelViewSet):
    queryset = ScheduleCommand.objects.all()
    serializer_class = ScheduleCommandSerializer
    permission_classes = [permissions.AllowAny]

class PeriodictasksViewsets(viewsets.ModelViewSet):
    queryset = Periodictasks.objects.all()
    serializer_class = Periodictasksserializer
    permission_classes = [permissions.AllowAny]

  


class ClockedTaskViewsets(viewsets.ModelViewSet):
    queryset = ClockedTask.objects.all()
    serializer_class = ClockedTaskSerializer
    permission_classes = [permissions.AllowAny]


class IntervalViewsets(viewsets.ModelViewSet):
    queryset = interval.objects.all()
    serializer_class = IntervalSerializer
    permission_classes = [permissions.AllowAny]

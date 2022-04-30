from .models import ScheduleCommand
# import serializers
from rest_framework import serializers
from django_celery_beat.models import PeriodicTask

class ScheduleCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleCommand
        fields = ('id', 'name', 'description', 'command')

# django celery beat periodic tasks serializer
class Periodictasksserializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodicTask
        fields = '__all__'


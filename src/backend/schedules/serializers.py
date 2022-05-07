from .models import ScheduleCommand, Periodictasks, ClockedTask, interval
# import serializers
from rest_framework import serializers


class ScheduleCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleCommand
        fields = ('id', 'name', 'description', 'command')

# django celery beat periodic tasks serializer
class Periodictasksserializer(serializers.ModelSerializer):
    class Meta:
        model = Periodictasks
        fields = ('id','name','command','interval','status')


class ClockedTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClockedTask
        fields = '__all__'


class IntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = interval
        fields = '__all__'
from .models import ScheduleCommand, Periodictasks, ClockedTask, interval
# import serializers
from rest_framework import serializers


class ScheduleCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduleCommand
        fields = ('id', 'name', 'description', 'command')



class IntervalSerializer(serializers.ModelSerializer):
    class Meta:
        model = interval
        fields = '__all__'


#  periodic tasks serializer
class Periodictasksserializer(serializers.ModelSerializer):
    # show all commands from many to many
    command = ScheduleCommandSerializer(required=False)
    interval = IntervalSerializer(required=False)
    class Meta:
        model = Periodictasks
        fields = ('id','name','command','interval','status', 'description')

    def to_internal_value(self, data):
        # get nested objects
        command_data = data.pop('command')
        interval_data = data.pop('interval')
        # create new objects
        command = ScheduleCommand(**command_data)
        interva = interval(**interval_data)
        # create new validated data
        validated_data = super().to_internal_value(data)
        validated_data['command'] = command
        validated_data['interval'] = interva
        return validated_data
        
    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)
    def update(self, instance, validated_data):
        command_data = validated_data.pop('command')
        interval_data = validated_data.pop('interval')
        # update validated data
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        # uopdate nested objects
        instance.command.name = command_data.get('name')
        instance.command.description = command_data.get('description')
        instance.command.command = command_data.get('command')
        instance.interval.name = interval_data.get('name')
        instance.interval.description = interval_data.get('description')
        instance.interval.interval = interval_data.get('interval')
        instance.interval.status = interval_data.get('status')
        instance.save()
        return instance





class ClockedTaskSerializer(serializers.ModelSerializer):
    #     # show all commands from many to many
    # command = ScheduleCommandSerializer(many=True, required=False)
    class Meta:
        model = ClockedTask
        fields = ('id', 'name', 'description', 'command', 'timetorun','created_at','updated_at')

    # set `read_only=True` on nested serializer fields
    # def get_fields(self):
    #     fields = super().get_fields()
    #     fields['command'].read_only = True
    #     return fields
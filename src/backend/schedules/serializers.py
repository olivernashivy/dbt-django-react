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
    command = ScheduleCommandSerializer()
    interval = IntervalSerializer()
    class Meta:
        model = Periodictasks
        fields = ('id','name','command','interval','status', 'description')
    
    def create(self, validated_data):
        command_data = validated_data.pop('command')
        interval_data = validated_data.pop('interval')
        command = ScheduleCommand.objects.create(**command_data)
        interval = interval.objects.create(**interval_data)
        periodic_task = Periodictasks.objects.create(command=command, interval=interval, **validated_data)
        return periodic_task
    
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
    command = ScheduleCommandSerializer(many=True)
    class Meta:
        model = ClockedTask
        fields = ('id', 'name', 'description', 'command', 'timetorun','created_at','updated_at')

    # set `read_only=True` on nested serializer fields
    # def get_fields(self):
    #     fields = super().get_fields()
    #     fields['command'].read_only = True
    #     return fields
    def create(self, validated_data):
        command_data = validated_data.pop('command')
        clocked_task = ClockedTask.objects.create(**validated_data)
        for command in command_data:
            clocked_task.command.add(command)
        return clocked_task

    def update(self, instance, validated_data):
        command_data = validated_data.pop('command')
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.timetorun = validated_data.get('timetorun', instance.timetorun)
        print("5555")
        instance.command.clear()
        for command in command_data:
            print(command)
            
            instance.command.add(int(command))
        instance.save()    
        return instance
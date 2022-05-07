from django.db import models
from django.utils import timezone
from enumchoicefield import ChoiceEnum, EnumChoiceField
from django_celery_beat.models import IntervalSchedule, PeriodicTask
import json
# Create your models here.
class ScheduleCommand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    command = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class interval(models.Model):
    timechoices = (
        ('minutes', 'minutes'),
        ('hours', 'hours'),
        ('days', 'days'),
        ('weeks', 'weeks'),
        ('months', 'months'),
        ('years', 'years'),
    )
    numberofperioods = models.IntegerField()   
    intervalperiods = models.CharField(max_length=100, choices=timechoices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'run every {self.numberofperioods} {self.intervalperiods}'


class Periodictasks(models.Model):
    name = models.CharField(max_length=100)
    command = models.ForeignKey(ScheduleCommand, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    interval = models.ForeignKey(interval, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    task = models.OneToOneField(
        PeriodicTask,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    status = models.CharField(max_length=100, choices=(('active', 'active'), ('inactive', 'inactive')), default='active')

    def __str__(self):
        return self.name
    def setup_task(self):
        # create task interval 
        interval = IntervalSchedule.objects.create(
            every=self.interval.numberofperioods,
            period=self.interval.intervalperiods
        )
        # if status is active enabletask =True else False
        if self.status == 'active':
            enabletask = True
        else:
            enabletask = False
        
        self.task = PeriodicTask.objects.create(
            name=self.name,
            task=self.command.command,
            interval=interval,
            enabled=enabletask,
            args=json.dumps([self.id]),
            start_time=timezone.now()
        )
        self.save()
    
    def disable_task(self):
        if self.task is not None:
            print("task disabled")
            self.task.enabled = False
            self.task.save()
    
    def enable_task(self):
        if self.task is not None:
            print("task enabled")
            self.task.enabled = True
            self.task.save()
    
    def delete(self, *args, **kwargs):
        if self.task is not None:
            self.task.delete()
        return super(self.__class__, self).delete(*args, **kwargs)


class ClockedTask(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    command = models.ManyToManyField(ScheduleCommand)
    timetorun =  models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

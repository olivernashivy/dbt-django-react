from django.dispatch import receiver
from django.db.models.signals import post_save
import datetime
from .models import Periodictasks, ScheduleCommand, ClockedTask
from django.contrib.auth import get_user_model
from schedules.tasks import  run_clocked_task, run_periodic_task
User = get_user_model()
users = User.objects.all()


@receiver(post_save, sender=Periodictasks)
def auto_create_periodic_task(sender, instance, created, **kwargs):
    # run task with apply_async at a specific time
    if instance.task is not None:
        if instance.status == "active":
            instance.enable_task()
            # run_periodic_task(instance.id)
        else:
            instance.disable_task()

    else: 
        instance.setup_task()
      


@receiver(post_save, sender=ClockedTask)
def auto_create_clocked_task(sender, instance, created, **kwargs):
    # run task with apply_async at a specific time
    time_to_run = instance.timetorun
    run_clocked_task.apply_async(args=[instance.id], eta=time_to_run)
    print('Periodic task created')
 


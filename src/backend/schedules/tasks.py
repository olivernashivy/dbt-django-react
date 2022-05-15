
import os
import datetime
from celery import shared_task
from .models import ScheduleCommand, Periodictasks, ClockedTask
from celery.schedules import crontab
from dbtscheduler.celery import app

@shared_task
def run_all_available_comands():
    print('Running all available commands')
    # get current path
    current_path = os.path.dirname(os.path.abspath(__file__))
    # goes back 4 folders
    path_dbt = os.path.abspath(os.path.join(current_path, os.pardir, os.pardir, os.pardir))
    # from path_dbt cd into jaffle_shop folder
    path_dbt = os.path.join(path_dbt, 'jaffle_shop')
    try:
        for command in ScheduleCommand.objects.all():
            # run command inside path_dbt
            print(path_dbt)
            os.system('cd ' + path_dbt + ' && ' + command.command)
            print('Command executed successfully')
    except Exception as e:
        print(e)
        print('Error while running command')


@shared_task
def run_one_command(command_id):
    # get comand from database
    command = ScheduleCommand.objects.get(id=command_id)
    if command:
        comant_text = command.command
    print('Running command: ' + command.name)
    # get current path
    current_path = os.path.dirname(os.path.abspath(__file__))
    # goes back 4 folders
    path_dbt = os.path.abspath(os.path.join(current_path, os.pardir, os.pardir, os.pardir))
    # from path_dbt cd into jaffle_shop folder
    path_dbt = os.path.join(path_dbt, 'jaffle_shop')
    try:
        # run command inside path_dbt
        os.system('cd ' + path_dbt + ' && ' + comant_text)
        print('Command executed successfully')
    except Exception as e:
        print(e)
        print('Error while running command')


# run clocked task
@shared_task
def run_clocked_task(periodic_task_id):
    # get periodic task from database
    periodic_task = ClockedTask.objects.get(id=periodic_task_id)
    if periodic_task:
        # get all commands from many to many
        command_text = periodic_task.command.all()
        print('Running periodic task: ' + periodic_task.name)
        # get current path
        current_path = os.path.dirname(os.path.abspath(__file__))
        # goes back 4 folders
        path_dbt = os.path.abspath(os.path.join(current_path, os.pardir, os.pardir, os.pardir))
        # from path_dbt cd into jaffle_shop folder
        path_dbt = os.path.join(path_dbt, 'jaffle_shop')
        try:
            # run command inside path_dbt
            for command in command_text:
                #os.system('cd ' + path_dbt + ' && ' + command.command)
                print(command.command)
                print('Command executed successfully')
        except Exception as e:
            print(e)
            print('Error while running command')


# run periodic tasks that repaet every time
@shared_task
def run_periodic_task(periodic_task_id):
    # get periodic task from database
    periodic_task = Periodictasks.objects.get(id=periodic_task_id)
    # celery beat runs this task every minute
    # so we need to check if the time to run is now
    if periodic_task:
        # get all commands from foreign relation
        command_text = periodic_task.command
        command_task = periodic_task.task
        print('Running periodic task: ' + periodic_task.name)
        print('Runnng command: ' + command_text.command)
        # get current path
        current_path = os.path.dirname(os.path.abspath(__file__))
        # goes back 4 folders
        path_dbt = os.path.abspath(os.path.join(current_path, os.pardir, os.pardir, os.pardir))
        # from path_dbt cd into jaffle_shop folder
        path_dbt = os.path.join(path_dbt, 'jaffle_shop')
        try:
            # run command inside path_dbt
            if command_task:
                os.system('cd ' + path_dbt + ' && ' + command_text.command)
                print(command_text)
                print('Command executed successfully')
        except Exception as e:
            print(e)
            print('Error while running command')



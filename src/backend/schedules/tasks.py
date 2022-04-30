import os
import datetime
from celery import shared_task
from .models import ScheduleCommand


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
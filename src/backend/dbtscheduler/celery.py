from celery import Celery
from celery.schedules import crontab
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dbtscheduler.settings')
app = Celery('dbtscheduler')

CELERY_TIMEZONE = 'UTC'

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
app.conf.task_routes = (
    [
        ('schedules.tasks.*', {'queue': 'celery'}),
    ],
)
# configure beat schedule that use task get_orgs_short_report_csv every night at midnight


#def getcrontab():
    # periodic_task = Periodictasks.objects.all()
    # # get foreign key from periodic task interval
    # for tasks in periodic_task:
    #     interval = tasks.interval
    #     # get crontab from interval
    #     crontab_interval = interval.intervalperiods
    #     period_interval = interval.numberofperioods
    #     cron = crontab(minute='*/1'),
    #     if crontab_interval == 'minutes':
    #         cron = crontab(minute=f'*/{period_interval}'),
    #     elif crontab_interval == 'hours':
    #         cron = crontab(hour=f'*/{period_interval}'),
    #     elif crontab_interval == 'days':
    #         cron = crontab(day=f'*/{period_interval}'),
    #     elif crontab_interval == 'weeks':
    #         cron = crontab(day_of_week=f'*/{period_interval}'),
    #     elif crontab_interval == 'months':
    #         cron = crontab(day_of_month=f'*/{period_interval}'),

    #     return cron

# start this task command: celery -A settings beat -l info
app.conf.beat_schedule = {
    'run_periodic_task': {
        'task': 'schedules.tasks.run_periodic_task',
        # 'schedule': crontab(minute='*/1'),
        #'schedule': getcrontab(),

    },
    
}
from celery import Celery
from django.conf import settings
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
# start this task command: celery -A settings beat -l info
# app.conf.beat_schedule = {
#     'get_orgs_short_report_csv': {
#         'task': 'organizations.tasks.generate_small_report_csv',
#         # 'schedule': crontab(minute='*/1'),
#         'schedule': crontab(minute=0, hour=0),
#     },
#     'get_orgs_csv': {
#         'task': 'organizations.tasks.generate_all_organization_csv',
#         # set schedule to every day at midnight
#         'schedule': crontab(minute=0, hour=0),
#     },
    
# }
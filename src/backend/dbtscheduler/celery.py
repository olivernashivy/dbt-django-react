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


import os
import datetime
from settings import BASE_DIR
from celery import shared_task


def generatedaily():
    print('Generating daily report')

@shared_task
def generate_all_organization_csv():
    generatedaily()


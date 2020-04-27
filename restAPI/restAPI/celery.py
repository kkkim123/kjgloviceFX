from __future__ import absolute_import
from django.conf import settings

import os
from celery import Celery
from celery import shared_task


# settings environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restAPI.settings')

app = Celery('restAPI')
app.config_from_object('django.conf:settings', namespace='CELERY')

# load task module from all apps in project
app.autodiscover_tasks()

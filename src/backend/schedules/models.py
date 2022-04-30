from click import command
from django.db import models

# Create your models here.
class ScheduleCommand(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    command = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
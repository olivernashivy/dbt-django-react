from django.contrib import admin
from .models import ScheduleCommand, Periodictasks, ClockedTask, interval, RegisteredTasks
from celery import current_app
# form import
from django import forms
# render import
from django.shortcuts import render
from celery.utils import cached_property
from django.forms.widgets import Select
from django.utils.translation import gettext_lazy as _
# Register your models here.
class TaskSelectWidget(Select):
    """Widget that lets you choose between task names."""

    celery_app = current_app
    _choices = None

    def tasks_as_choices(self):
        _ = self._modules  # noqa
        tasks = list(sorted(name for name in self.celery_app.tasks
                            if not name.startswith('celery.')))
        return (('', ''), ) + tuple(zip(tasks, tasks))

    @property
    def choices(self):
        if self._choices is None:
            self._choices = self.tasks_as_choices()
        return self._choices

    @choices.setter
    def choices(self, _):
        # ChoiceField.__init__ sets ``self.choices = choices``
        # which would override ours.
        pass

    @cached_property
    def _modules(self):
        self.celery_app.loader.import_default_modules()


class TaskChoiceField(forms.ChoiceField):
    """Field that lets you choose between task names."""

    widget = TaskSelectWidget

    def valid_value(self, value):
        return True

class PeriodicTaskForm(forms.ModelForm):
    """Form that lets you create and modify periodic tasks."""

    regtask = TaskChoiceField(
        label=_('Task (registered)'),
        required=False,
    )
    def __init__(self, *args, **kwargs):
        super(PeriodicTaskForm, self).__init__(*args, **kwargs)
        if self.instance and self.instance.task_id:
            self.fields['regtask'].initial = self.instance.task.task
      

    def save(self, commit=True):
        task = super(PeriodicTaskForm, self).save(commit=commit)
        if task.task:
            task.task.task = self.cleaned_data['regtask']
        if commit:
            task.save()
        return task


class PeriodictasksCustomAdmin(admin.ModelAdmin):
    list_display = ('name', 'command', 'interval', 'status')
    list_filter = ('status',)
    # hide task field
    exclude = ('task',)
    # overide register_task with custom form
    #form = PeriodicTaskForm


class RegisteredTasksAdmin(admin.ModelAdmin):
    # populate task field
   list_display = ('name', )

   
 

admin.site.register(ScheduleCommand)

admin.site.register( Periodictasks, PeriodictasksCustomAdmin)
admin.site.register(ClockedTask)
admin.site.register(interval)
ADMIN_SITE_HEADER = 'Schedules'

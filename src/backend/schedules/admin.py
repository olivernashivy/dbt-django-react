from django.contrib import admin
from .models import ScheduleCommand, Periodictasks, ClockedTask, interval
# Register your models here.
class PeriodictasksCustomAdmin(admin.ModelAdmin):
    list_display = ('name', 'command', 'interval', 'status')
    list_filter = ('status',)
    # hide task field
    exclude = ('task',)

admin.site.register(ScheduleCommand)

admin.site.register( Periodictasks, PeriodictasksCustomAdmin)
admin.site.register(ClockedTask)
admin.site.register(interval)

ADMIN_SITE_HEADER = 'Schedules'

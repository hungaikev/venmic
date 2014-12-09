from django.contrib import admin
from bootcamp.tasks.models import Task, Client, Property




class PropertyInline(admin.StackedInline):
    model = Property
    extra = 2
   



class TaskAdmin(admin.ModelAdmin):
    fieldsets = [
      (None,               {'fields': ['title']}),
        ('Description', {'fields': ['description']}),
        ('Start Date', {'fields': ['start_date']}),
        ('End Date', {'fields': ['end_date']}),
        ('Client', {'fields': ['client']}),
        ('Property Details', {'fields': ['property_details']}),
        ('Assigned To', {'fields': ['assign_to']}),
    ]
    
    search_fields = ['title']
    list_display = ('title', 'start_date','end_date','client','property_details','assign_to')

	

class ClientAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['name']}),
        ('Phone Number', {'fields': ['phone'], 'classes': ['collapse']}),
    ]
    inlines = [PropertyInline]
    search_fields = ['name']
    list_display = ('name', 'phone')
		

admin.site.register(Client, ClientAdmin)
admin.site.register(Task, TaskAdmin)
   
from __future__ import absolute_import
from django import forms
from datetime import date
from django.forms import widgets
from django.forms.widgets import DateInput

from bootcamp.tasks.models import Task, ValuationReport, Client, Property

class TaskForm(forms.ModelForm):
	class Meta:
		model = Task
		widgets = {'start_date':DateInput(attrs={
            'class': 'datepicker',
             
        }),

        'end_date':DateInput(attrs={
            'class': 'datepicker',

            
        }),
        }
		

class ValuationReportForm(forms.ModelForm):
	class Meta:
		model = ValuationReport


class ClientForm(forms.ModelForm):
	class Meta:
		model = Client



class PropertyForm(forms.Form):
	class Meta:
		model = Property

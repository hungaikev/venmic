from __future__ import absolute_import
from django.shortcuts import render
from django.db.models import Max
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.shortcuts import get_object_or_404
from django.utils.translation import ugettext as _
from django.views.generic import ListView, DetailView, TemplateView, CreateView, UpdateView
from bootcamp.tasks.models import Task, ValuationReport, Client, Property
from bootcamp.tasks.forms import TaskForm, ValuationReportForm, ClientForm, PropertyForm
from django.http import HttpResponse
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User, Group

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework import viewsets




class LoggedInMixin(object):
	@method_decorator(login_required)
	def dispatch(self, *args, **kwargs):
		return super(LoggedInMixin, self).dispatch(*args, **kwargs)



"""Tasks Views """



class TaskList(LoggedInMixin, ListView):
	model = Task
	template_name = "task/task_list.html"
	allow_empty = True
	context_object_name = "tasks"

	def get_queryset(self):
		return Task.objects.filter()

	
class TaskDetail(LoggedInMixin, DetailView):
	model = Task
	template_name = "task/task_detail.html"
	context_object_name = "task"

	def get_queryset(self):
		return Task.objects.all()



class TaskCreate(LoggedInMixin, CreateView):
	context_object_name = 'newtask'
	model = Task
	form = TaskForm
	template_name = "task/add_task.html"

	def get_success_url(self):
		return reverse('tasks')


class TaskUpdate(LoggedInMixin, UpdateView):
	context_object_name = 'taskedit'
	model = Task
	template_name = "task/edit_task.html"

	def get_success_url(self):
		return reverse('tasks')


"""Client Views """

class ClientList(LoggedInMixin, ListView):
	model = Client
	template_name = "task/client_list.html"
	allow_empty = True
	context_object_name = "clients"

	def get_queryset(self):
		return Client.objects.all()[:20]

	
class ClientDetail(LoggedInMixin, DetailView):
	model = Client
	template_name = "task/client_detail.html"
	context_object_name = "client"

	def get_queryset(self):
		return Client.objects.all()



class ClientCreate(LoggedInMixin, CreateView):
	context_object_name = 'newclient'
	model = Client
	form = ClientForm
	template_name = "task/add_client.html"

	def get_success_url(self):
		return reverse('clients')


class ClientUpdate(LoggedInMixin, UpdateView):
	context_object_name = 'clientedit'
	model = Client
	template_name = "task/editclient.html"

	def get_success_url(self):
		return reverse('clients')


"""Property Views """

class PropertyList(LoggedInMixin, ListView):
	model = Property
	template_name = "task/property_list.html"
	allow_empty = True
	context_object_name = "all_properties"

	def get_queryset(self):
		return Property.objects.all()[:20]

	
class PropertyDetail(LoggedInMixin, DetailView):
	model = Property
	template_name = "task/property_detail.html"
	context_object_name = "all_properties"

	def get_queryset(self):
		return Property.objects.all()



class PropertyCreate(LoggedInMixin, CreateView):
	context_object_name = 'newproperty'
	model = Property
	form = PropertyForm
	template_name = "task/add_property.html"

	def get_success_url(self):
		return reverse('all_properties')


class PropertyUpdate(LoggedInMixin, UpdateView):
	context_object_name = 'editproperty'
	model = Client
	template_name = "tasks/editproperty.html"

	def get_success_url(self):
		return reverse('all_properties')


"""ValuationReport Views """

class ValuationReportList(LoggedInMixin, ListView):
	model = ValuationReport
	template_name = "task/report_list.html"
	allow_empty = True
	context_object_name = "reports"

	def get_queryset(self):
		return ValuationReport.objects.all()[:20]

	
class ValuationReportDetail(LoggedInMixin, DetailView):
	model = ValuationReport
	template_name = "task/report_detail.html"
	context_object_name = "report"

	def get_queryset(self):
		return ValuationReport.objects.all()



class ValuationReportCreate(LoggedInMixin, CreateView):
	context_object_name = 'newreport'
	model = ValuationReport
	form = ValuationReportForm
	template_name = "task/add_report.html"

	def get_success_url(self):
		return reverse('reports')


class ValuationReportUpdate(LoggedInMixin, UpdateView):
	context_object_name = 'editreport'
	model = ValuationReport
	template_name = "task/edit_report.html"

	def get_success_url(self):
		return reverse('reports')



from .serializers import UserSerializer,GroupSerializer,ClientSerializer,PropertySerializer,ValuationReportSerializer,TaskSerializer

class UserViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows users to be viewed or edited."""
	queryset = User.objects.all()
	serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows groups to be viewed or edited."""
	queryset = Group.objects.all()
	serializer_class = GroupSerializer


class ClientViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows clients to be viewed or edited."""
	queryset = Client.objects.all()
	serializer_class = ClientSerializer


class PropertyViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows properties to be viewed or edited."""
	queryset = Property.objects.all()
	serializer_class = PropertySerializer


class ValuationReportViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows Valuation Reports  to be viewed or edited."""
	queryset = ValuationReport.objects.all()
	serializer_class = ValuationReportSerializer


class TaskViewSet(viewsets.ModelViewSet):
	"""API endpoint that allows clients to be viewed or edited."""
	queryset = Task.objects.all()
	serializer_class = TaskSerializer








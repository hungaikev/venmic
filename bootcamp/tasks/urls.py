from django.conf.urls import patterns, url
from bootcamp.tasks.views import TaskList,TaskDetail,TaskCreate,TaskUpdate
from bootcamp.tasks.views import ClientList,ClientDetail,ClientCreate,ClientUpdate
from bootcamp.tasks.views import PropertyList,PropertyDetail,PropertyCreate, PropertyUpdate
from bootcamp.tasks.views import ValuationReportList,ValuationReportDetail,ValuationReportCreate, ValuationReportUpdate


urlpatterns = patterns('',

	### Task Urls

	
	url(r'^newtask/', TaskCreate.as_view(), name = 'newtask',),
	url(r'^tasks/', TaskList.as_view(), name = 'tasks',),
	url(r'^taskupdate/(?P<pk>\d+)$', TaskUpdate.as_view(), name = 'taskupdate',),
	url(r'^task(?P<pk>\d+)$/', TaskDetail.as_view(), name = 'task',),
	

	### Clients urls

	url(r'^newclient/', ClientCreate.as_view(), name = 'newclient',),
	url(r'^clients/', ClientList.as_view(), name = 'clients',),
	url(r'^clientupdate/(?P<pk>\d+)$', ClientUpdate.as_view(), name = 'clientupdate',),
	url(r'^client(?P<pk>\d+)$/', ClientDetail.as_view(), name = 'client',),
	
	### Property urls

	url(r'^newproperty/', PropertyCreate.as_view(), name = 'newproperty',),
	url(r'^all_properties/', PropertyList.as_view(), name = 'all_properties',),
	url(r'^propertyupdate/(?P<pk>\d+)$', PropertyUpdate.as_view(), name = 'propertyupdate',),
	url(r'^property(?P<pk>\d+)$/', PropertyDetail.as_view(), name = 'property',),

	###ValuationReport urls
	
	
	url(r'^newreport/', ValuationReportCreate.as_view(), name = 'newreport',),
	url(r'^reports/', ValuationReportList.as_view(), name = 'reports',),
	url(r'^reportupdate/(?P<pk>\d+)$', ValuationReportUpdate.as_view(), name = 'reportupdate',),
	url(r'^report(?P<pk>\d+)$/', ValuationReportDetail.as_view(), name = 'report',),
	


	)
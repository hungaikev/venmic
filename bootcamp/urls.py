from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.core.urlresolvers import reverse
from django.http import HttpResponsePermanentRedirect, HttpResponse
from django.conf import settings
from django.contrib import admin
from rest_framework import routers
from django.views.generic import TemplateView
from tasks.views import UserViewSet,GroupViewSet,ClientViewSet,PropertyViewSet,ValuationReportViewSet,TaskViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'properties', PropertyViewSet)
router.register(r'valuations', ValuationReportViewSet)
router.register(r'tasks', TaskViewSet)



admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'bootcamp.core.views.index', name='index'),
    url(r'^home', 'bootcamp.core.views.home', name='home'),
    url(r'^login', 'django.contrib.auth.views.login', {'template_name': 'core/login.html'}, name='login'),
    url(r'^logout', 'django.contrib.auth.views.logout', {'next_page': '/'}, name='logout'),
    url(r'^signup/$', 'bootcamp.auth.views.signup', name='signup'),
    url(r'^settings/$', 'bootcamp.core.views.settings', name='settings'),
    url(r'^settings/picture/$', 'bootcamp.core.views.picture', name='picture'),
    url(r'^settings/upload_picture/$', 'bootcamp.core.views.upload_picture', name='upload_picture'),
    url(r'^settings/save_uploaded_picture/$', 'bootcamp.core.views.save_uploaded_picture', name='save_uploaded_picture'),
    url(r'^settings/password/$', 'bootcamp.core.views.password', name='password'),
    url(r'^network/$', 'bootcamp.core.views.network', name='network'),
    url(r'^feeds/', include('bootcamp.feeds.urls')),
    url(r'^questions/', include('bootcamp.questions.urls')),
    url(r'^articles/', include('bootcamp.articles.urls')),
    url(r'^messages/', include('bootcamp.messages.urls')),
    
    url(r'^tasks/', include('bootcamp.tasks.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls',namespace='rest_framework')),
    url(r'^docs/', include('rest_framework_swagger.urls')),
    url(r'^about/$',(TemplateView.as_view(template_name='core/about.html')), name='about'),
    url(r'^services/$',(TemplateView.as_view(template_name='core/services.html')), name='services'),
    url(r'^valuation/$',(TemplateView.as_view(template_name='core/valuation.html')), name='valuation'),
    url(r'^sales/$',(TemplateView.as_view(template_name='core/sales.html')), name='sales'),
    url(r'^properties/$',(TemplateView.as_view(template_name='core/properties.html')), name='properties'),
    url(r'^contact/$',(TemplateView.as_view(template_name='core/contact.html')), name='contact'),
    url(r'^notifications/$', 'bootcamp.activities.views.notifications', name='notifications'),
    url(r'^notifications/last/$', 'bootcamp.activities.views.last_notifications', name='last_notifications'),
    url(r'^notifications/check/$', 'bootcamp.activities.views.check_notifications', name='check_notifications'),
    url(r'^search/$', 'bootcamp.search.views.search', name='search'),
    url(r'^(?P<username>[^/]+)/$', 'bootcamp.core.views.profile', name='profile'),
    url(r'^i18n/', include('django.conf.urls.i18n', namespace='i18n')),

) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

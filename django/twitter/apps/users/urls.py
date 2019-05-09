from django.conf.urls import url
from . import views

urlpatterns = [
    url('^new/$', views.new, name="new"),
    url('^create/$', views.create, name="create"),
]
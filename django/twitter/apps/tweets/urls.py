from django.conf.urls import url
from . import views

urlpatterns = [
    url('^$', views.index, name="index"),
    url('^create/$', views.create, name="create"),
    url('^add_like/(?P<tweet_id>\d+)/$', views.add_like, name="add_like"),
    url('^remove_like/(?P<tweet_id>\d+)/$', views.remove_like, name="remove_like"),
]
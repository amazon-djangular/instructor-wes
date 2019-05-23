# Django Version 2
This document outlines some key differences between Django version 1.10 and 2.2 that students should be aware of when approaching their projects.

## urls
Urls now use the `path` function instead of the `url` function. We'll also be using a more flask-like route definition, rather than the regex based version from before. You'll note that we will not use raw strings, carats, or dollar signs. We will also be getting rid of the more verbose (?P<id>\d+) syntax for extracting information from urls.

##### Project Level
```python
# Django 1.10
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^activities/', include('apps.activities.urls')),
    url(r'^locations/', include('apps.locations.urls')),
    url(r'^users/', include('apps.users.urls')),
]
```
```python
# Django 2.2
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('locations/', include('apps.locations.urls')),
    path('activities/', include('apps.activities.urls')),
]
```
##### App Level
```python
# Django 1.10
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^create/$', views.create, name="create"),
    url(r'^show/(?P<user_id>\d+)/$', views.show),
]
```
```python
# Django 2.2
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('create/', views.create),
    # notice that the type int is used, this is optional but preferred
    path('show/<int:user_id>/', views.show),
]
```

## Models
Models are almost identical between versions. However, there is one small caveat that we need to be aware of. When we configure a relationship, what Django 1.10 did for us automatically, we need to specify manually in v2.2. Cascading upon deletion means that when a related "parent" object is deleted, all children will be deleted. In the case below, when a user is deleted, all of their associated activities will be deleted as well. There are other options for this field that can be modified, but models.CASCADE is the default in Django 1.10.
```python
# Django 1.10
class Activity(models.Model):
    user = models.ForeignKey(User, related_name="activities")
```
```python
# Django 2.2
class Activity(models.Model):
    # on_delete is required
    user = models.ForeignKey(User, related_name="activities", on_delete=models.CASCADE)
```
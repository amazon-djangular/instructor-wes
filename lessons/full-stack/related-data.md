# Dealing With Related Data
Unfortunately, there isn't a particularly graceful way to deal with related information in Djangular, but there are myriad ways of dealing with said data. Below, we'll cover how one might deal with related data from the Angular side of the equation. It has its flaws, but is typical of a client application requesting data from a RESTful API to deal with information from the front-end. The flaws and potential next-steps will be discussed below.

Let's take a look at an example of the Django views from the ninja gold demo.
```python
# locations
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

# Create your views here.
def index(req):
    locations = Location.objects.all()
    json_locations = serializers.serialize('json', locations)
    return HttpResponse(json_locations, status=200, content_type="application/json")
```
```python
# activities
from django.shortcuts import HttpResponse
from .models import Activity
from django.core import serializers
import json

# Create your views here.
def index(req, user_id):
    activities = Activity.objects.filter(user=user_id).order_by('-created_at')
    json_activities = serializers.serialize('json', activities)
    return HttpResponse(json_activities, status=200, content_type='application/json')
```
What we'd like to do, is create a component that renders data from 
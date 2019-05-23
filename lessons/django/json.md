# JSON
Learning how to work with JSON is an important step toward making Django universally ingestible by various web clients, like our Angular app. While Python objects are great to work with in a Python app, they're not universally understood by browsers, phones, or most clients capable of making http requests. JSON, much like xml, is so common that almost every language and framework can natively understand and ingest it. Even Python!

## JSON in Python
Something that's important to understand is that Python as a language has a library built-in that can parse and create JSON data. All you have to do is import the json library and you're all set! json.dumps() and json.loads() are the most commonly used methods in the library. A quick example is shown below:
```python
import json
# convert a python dictionary into json
my_dict = {
  'first_name': 'John',
  'last_name': 'Appleseed'
}
json_version = json.dumps(my_dict)
# convert json data back to python
normal_again = json.loads(json_version)
```

## JSON in Django
While Python has an easy time converting native data types into JSON, information in our Django database (models classes) are not native types! We'll have to use a different tool to convert Django data into JSON called a serializer. Django comes pre-bundled with serializers and can be imported from the django.core library. The example below uses code from the ninja-gold demo.
```python
# views.py -- locations app
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

def index(req):
  # get all locations
  locations = Location.objects.all()
  # convert locations into json using a serializer
  json_locations = serializers.serialize('json', locations)
  return HttpResponse(json_locations, status=200, content_type="application/json")
```
Converting a list of items using the Django serializer makes things a breeze. However, there's one caveat. If we just need to serialize one item, things get hairy. There are many ways to deal with this issue, but in order to provide a simple, clean solution that is consistent with the rest of the content, we are providing an imperfect solution that will be used in demos and the rest of the Angular content. We'd be happy if you explored other options on your own!

Below, we're serializing a single location in a trivial, but explanatory example.
```python
# views.py -- locations app
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

def show(req, location_id):
  # get one location
  one_location = Location.objects.get(id=location_id)
  # put one_location into a list before serializing, this will return a list with one object in it
  json_locations = serializers.serialize('json', [location])
  return HttpResponse(json_locations, status=200, content_type="application/json")
```
Conversely, use .filter() instead of .get()
```python
# views.py -- locations app
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

def show(req, location_id):
  # get a list with one location in it
  locations = Location.objects.filter(id=location_id)
  json_locations = serializers.serialize('json', locations)
  return HttpResponse(json_locations, status=200, content_type="application/json")
```
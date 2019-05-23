# Django Responses
Now that we're responding with JSON data, we have no need for render or redirect. Now, we'll opt for the generic HttpResponse because it gives us control over how our server will respond with information to the client. There are a few things we'll need to be aware of now in order to take full control of our server.

#### Status Codes
HTTP status codes tell the client what went wrong so it can properly display feedback to the user. We'll most commonly use 200 for successful responses and 400 for unsuccessful responses, but we can also choose from a long list of other responses if we so desire. A list can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

#### Content Type/MIME type
Another thing we can now control is the type of data the client will expect when we send our response. What we're doing is attaching a "type" (much like a data type) into the response header (much like an html header) that tells our client what to expect. Primarily, we'll be using 'application/json', but there are other options to choose from, some of which can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#Important_MIME_types_for_Web_developers)

#### Usage
Now that we're armed with knowledge of JSON, status codes, and content types, let's see the HttpResponse in action using an example from the ninja gold demo.
```python
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

# Create your views here.
def index(req):
    locations = Location.objects.all()
    json_locations = serializers.serialize('json', locations)
    return HttpResponse(json_locations, status=200, content_type="application/json")
```
And a trivial example of an error response.
```python
from django.shortcuts import HttpResponse
import json

def send_error(req):
    errors = {
      'first_name': "first name must be at least 2 characters long",
      'last_name': "last name must be at least 2 characters long",
    }
    json_errors = json.dumps(errors)
    return HttpResponse(json_errors, status=400, content_type="application/json")
```
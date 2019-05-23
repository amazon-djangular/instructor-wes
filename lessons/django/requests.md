# Accepting Django Requests
Luckily, once we've configured our app, accepting get requests is identical to how we would do it in a Django-only project, but we still need to learn how to deal with POST requests.

#### Deserialization
Django deals with JSON POST requests in an interesting way. First of all, we cannot use the request.POST dictionary anymore (boooooooo!). We'll instead have to get post information from request.body. Secondly, the information in request.body will be in an encoded bytestring. This basically just means that the request has been standardized so all computers can read it regardless of the language, but it's also an extra step for us. Finally, we have to remember that our body information is a string represented in JSON format, so we have to use python to "deserialize" the JSON into a native python object. The example below will assume that the following JSON object was posted to the server.
```json
{
  "name": "Wes",
  "favorite_food": "sushi"
}
```
And in our views.py:
```python
from django.shortcuts import HttpResponse
import json

# print statements included for you to try if you wish
def accept_post_request(req):
    print('encoded body:', req.body)
    # decode bytestring into python string
    decoded = req.body.decode()
    print('decoded body:', decoded)
    # convert decoded string into python dictionary
    post_data = json.loads(decoded)
    print('native python post data:', post_data)
    # access values like normal
    print('post data "name":', post_data['name'])
    # in one line
    data = json.loads(req.body.decode())
    return HttpResponse('posting is fun!')
```
NOTE: Angular is always looking for a JSON type response to a POST request, so make sure you're always sending something useful back to the client in JSON format!
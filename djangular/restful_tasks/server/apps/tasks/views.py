from django.shortcuts import HttpResponse
from django.core import serializers
from .models import Task
import json

# Create your views here.
def index(req):
    tasks = Task.objects.all()
    serialized_tasks = serializers.serialize('json', tasks)
    return HttpResponse(serialized_tasks, content_type='application/json', status=200)

def create(req):
    my_dictionary = json.loads(req.body.decode())
    print(my_dictionary['title'])
    return HttpResponse('this worked')
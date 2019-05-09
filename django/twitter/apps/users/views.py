from django.shortcuts import render, redirect
from django.contrib import messages
from .models import User

# Create your views here.
def new(req):
    return render(req, 'users/new.html')

def create(req):
    errors = User.objects.validate(req.POST)
    if errors:
        for error in errors:
            messages.error(req, error)
    else:
        user = User.objects.easy_create(req.POST)
        req.session['user_id'] = user.id
    return redirect('users:new')
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Tweet
from ..users.models import User

# Create your views here.
def index(req):
    if not 'user_id' in req.session:
        return redirect('users:new')

    context = {
        'tweets': Tweet.objects.order_by('-created_at'),
        'user': User.objects.get(id=req.session['user_id'])
    }
    return render(req, 'tweets/index.html', context)

def create(req):
    errors = Tweet.objects.validate(req.POST)
    if errors:
        for error in errors:
            messages.error(req, error)
    Tweet.objects.easy_create(req.POST, req.session['user_id'])
    return redirect('tweets:index')

def add_like(req, tweet_id):
    Tweet.objects.add_like(tweet_id, req.session['user_id'])
    return redirect('tweets:index')

def remove_like(req, tweet_id):
    Tweet.objects.remove_like(tweet_id, req.session['user_id'])
    return redirect('tweets:index')
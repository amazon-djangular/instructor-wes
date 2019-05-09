from django.shortcuts import render, redirect

# Create your views here.
def index(req):
    if not 'user_id' in req.session:
        return redirect('users:new')
    return render(req, 'tweets/index.html')
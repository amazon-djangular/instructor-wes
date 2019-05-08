from django.shortcuts import render, redirect

# Create your views here.
def index(req):
    context = {
        'header_text': "Hello World",
        'title': "Home",
        'user_info': {
            'name': "Wes",
            'favorite_food': 'sushi'
        }
    }
    return render(req, 'first_app/index.html', context)

def process(req):
    req.session['first_name'] = req.POST['first_name']
    req.session['last_name'] = req.POST['last_name']
    req.session['email'] = req.POST['email']
    req.session['password'] = req.POST['password']
    return redirect('/success')

def success(req):
    return render(req, 'first_app/success.html')
from django.shortcuts import render, redirect
import random
from datetime import datetime

# Create your views here.
def index(req):
    if 'gold' not in req.session:
        req.session['gold'] = 0

    if 'activities' not in req.session:
        req.session['activities'] = []
    return render(req, 'root/index.html')

def reset(req):
    req.session.clear()
    return redirect('/')

def process_money(req):
    # if location == 'farm':
    #     random_number = random.randint(10, 20)
    # elif location == 'cave':
    #     random_number = random.randint(5, 10)
    # elif location == 'house':
    #     random_number = random.randint(2, 5)
    # elif location == 'casino':
    #     random_number = random.randint(-50, 50)
    # else:
    #     random_number = 0

    location = req.POST['location']
    location_map = {
        'farm': random.randint(10, 20),
        'cave': random.randint(5, 10),
        'house': random.randint(2, 5),
        'casino': random.randint(-50, 50),
    }
    random_num = location_map[location]

    req.session['gold'] += random_num

    now = datetime.now()
    activity = {}
    if random_num >= 0:
        activity['css_class'] = 'green'
        activity['content'] = f'Won {random_num} golds from the {location} at {now}'
    else:
        activity['css_class'] = 'red'
        activity['content'] = f'Lost {random_num} golds from the {location} at {now}'

    req.session['activities'].insert(0, activity)
    req.session.modified = True
    return redirect('/')
# Full Stack Login and Registration
Login and registration, or authentication is an important aspect of many, many applications. It helps us associate data with users and verify that our users are allowed to see the information they're seeing. However, when our back-end and front-end live on entirely separate servers, storing information in the browser as a cookie (session) and sending it back and forth between the servers is much more difficult. The industry standard way of dealing with request authentication is through the use of JWTs or Javascript Web Tokens. You can read more about those and other similar tools [here](https://jwt.io/) and [here](https://oauth.net/2/). However, we are unfortunately able to cover request authentication using JWTs in this course. Instead, we'll be mimicking a cookie based authentication method using a javascript API called localStorage and discussing the security flaws in that approach at length.

For most of this example, our login and registration logic on the server side will be the same as what we're used to, aside from having to decode and deserialize the posted data, but examples will be included. On the Angular side of things, we're going to have to manually store and clear information from localStorage much the same way as we did in Django and Flask with session.

IMPORTANT: because we are not serving either our front or back end over https, any sensitive information will be sent, unencrypted, across the internet for any malicious actors to steal. Please DO NOT use real passwords until your site is protected with SSL.

First, let's set up our server's login and registration features. The following demo will be based on Ninja Gold.

users/models.py
```python
from django.db import models
import re
import bcrypt
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

# Create your models here.
class UserManager(models.Manager):
    def validate(self, data):
        errors = []
        if len(data['first_name']) < 2:
            errors.append('First name must be at least 2 characters long')
        if len(data['last_name']) < 2:
            errors.append('Last name must be at least 2 characters long')
        if not EMAIL_REGEX.match(data['email']):
            errors.append('Email must be valid')
        if len(data['password']) < 8:
            errors.append('Password must be at least 2 characters long')
        return errors

    def easy_create(self, data):
        # hash password
        hashed_pw = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
        print(hashed_pw)
        # create and return user
        return User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            pw_hash=hashed_pw.decode()
        )

    def login(self, data):
        matching_users = User.objects.filter(email=data['email'])
        if matching_users:
            user = matching_users[0]
            if bcrypt.checkpw(data['password'].encode(), user.pw_hash.encode()):
                return (True, user)
        return (False, ["Email or password incorrect"])

class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    gold = models.IntegerField(default=0)
    pw_hash = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = UserManager()
```
Notice that nothing here has changed from our Django-only version of login and registration. Next, let's check out our views functions. There are a few changes but the logic is mostly the same. We'll break down the differences below.

users/views.py
```python
def create(req):
    post_data = json.loads(req.body.decode())
    errors = User.objects.validate(post_data)
    if errors:
        return HttpResponse(json.dumps(errors), status=400, content_type='application/json')
    
    # create a user, return user info as json
    entire_user = User.objects.easy_create(post_data)
    user = {
        'first_name': entire_user.first_name,
        'id': entire_user.id,
        'gold': entire_user.gold
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type="application/json")

def login(req):
    post_data = json.loads(req.body.decode())
    valid, result = User.objects.login(post_data)
    if not valid:
        json_errors = json.dumps(result)
        return HttpResponse(json_errors, status=400, content_type="application/json")
    user = {
        'first_name': result.first_name,
        'id': result.id,
        'gold': result.gold
    }
    json_user = json.dumps(user)
    return HttpResponse(json_user, status=200, content_type='application/json')
```
There are two key differences here that we should be aware of.
  1. We're sending back JSON data in any case, successful or not.
  2. We're creating a custom response that we'll end up using on the front-end.
  
That's it. Things might look different at first glance, but let's analyze the step-by-step instructions we're giving to the create function.
  - Turn the JSON content from Angular into something python can read.
    - `post_data = json.loads(req.body.decode())`
  - Send that data to our validator.
  - If the validator comes back with errors:
    - send an error response to the client.
  - If the validator finds no errors:
    - create a user.
    - once the user is created, take the information we want out of it and turn it into json.
    - send the json user data to the client.

The same thing happens with login. We're changing the data and intentionally sending back information about the user, but all the logic is consistent.

Notice that we are not yet dealing with session. Session actually will not come into play in this example. Let's examine how we'll deal with this response on the Angular side.

First, we are going to have to set up a significant amount of boilerplate. The following code is presented to give a complete example. The inner-workings of the form handlers can be found on the learn platform. Let's start with our html form and component, assuming that our service will be responsible for making the final http request to the server.

login-reg.component.html
```html
<h1>Login Or Register</h1>
<h2>Register</h2>
<form (submit)='submitRegister()'>
  <label for="first_name">First Name:</label>
  <input type="text" name="first_name" placeholder="Vanilla" [(ngModel)]='registerData.first_name'>
  <label for="last_name">Last Name:</label>
  <input type="text" name="last_name" placeholder="Ice" [(ngModel)]='registerData.last_name'>
  <label for="email">Email:</label>
  <input type="text" name="email" placeholder="vanillaice@yahoo.com" [(ngModel)]='registerData.email'>
  <label for="password">Password:</label>
  <input type="password" name="password" placeholder="iceicebaby99" [(ngModel)]='registerData.password'>
  <input type="submit" value="Register">
</form>
<h2>Login</h2>
<form (submit)="submitLogin()">
  <label for="email">Email:</label>
  <input type="text" name="email" placeholder="vanillaice@yahoo.com" [(ngModel)]="loginData.email">
  <label for="password">Password:</label>
  <input type="password" name="password" placeholder="iceicebaby99" [(ngModel)]="loginData.password">
  <input type="submit" value="Login">
</form>
```

login-reg.component.ts
```javascript
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  registerData: object = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }

  loginData: object = {
    email: '',
    password: '',
  }

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  submitRegister() {
    this.userService.createUser(this.registerData);
  }

  submitLogin() {
    this.userService.loginUser(this.loginData);
  }
}
```
Note: you can add skeleton, bootstrap, or any css framework you'd like to the head tag of the index.html file if you'd like this form to look better without putting in the work on the css side.

Now that our boilerplate is set up, we'll want to dive into the most important new piece of information that we're covering in this section: how to tell the browser which user has logged in. Before, we would use session, which sent a cookie from the server to the browser (and back) that gave us insight into who was doing what on our page. This information came from the server and it allowed us to authenticate requests by asking for the presence of the user ID on the browser. Now, we'll be using an API called localStorage. It's essentially a way to store information on the browser, but using js. This is almost identical in practice to how we did things with session, but there's a serious security vulnerability that this introduces. _Anyone with basic knowledge of the web can change the id in local storage directly from their browser_. In other words, we are not building in a way of independently verifying that this person is who they say they are, or that they are allowed to access the information they're accessing, because we're not double-checking their identity on the server. That's where JWTs or OAuth come in. However, this will provide a simple example that we can use to mimic authentication. Let's dive into our user service.

users.service.ts
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = 'http://localhost:8000/users'
  constructor(private http: HttpClient) { }

  getUser() {

  }

  createUser(userData: object): void {
    let obs = this.http.post<object>(`${this.baseUrl}/create/`, userData);
    obs.subscribe(
      (data) => {
        localStorage.setItem('user_id', data.id);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  loginUser(loginData: object): void {
    let obs = this.http.post<object>(`${this.baseUrl}/login/`, loginData);
    obs.subscribe(
      (data) => {
        localStorage.setItem('user_id', data.id);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  logout(): void {
    localStorage.clear();
  }
}
```
This should look familiar to you. We're creating a post request, which will return an observable, and subscribing to that observable so we can deal with the information that comes back from the server. There are now 2 things we need to focus on.
  1. Notice that there are 2 callback functions in the subscribe().
    - The first callback does exactly what we're used to. When data comes back from the server, do something with the data.
    - The second callback deals with the case where there is a server error. Remember our error response on the server side?
  2. Notice the use of `localStorage.setItem()` and `localStorage.clear()`.
    - `localStorage.setItem('user_id', 1)` is the equivalent of saying `request.session['user_id'] = 1`. `.clear()` does what you'd expect.

The beautiful thing about this method is that localStorage is globally accessible to all components and services. No need to import, export, inject, or anything at all. We can just use it because it's part of javascript, no strings attached. If we'd like to access this information. For example, in the case of getting all of a user's activities in ninja gold, we can use `localStorage.getItem('user_id')`. If 'user_id' hasn't been set, `.getItem()` will return `null`, otherwise you'll get access to the user ID!

Let's take a look at an example of how we might use this new power with a trivial example from our activities service that gets all activities for a user with the ID 1 using the url `http://localhost:8000/activities/1`.
```javascript
getActivities(): Observable<object[]> {
  const userId = localStorage.getItem('user_id');
  if(userId === null) {
    console.log("user not found");
  } else {
    return this.http.get<object[]>(`${this.baseUrl}/${userId}`);
  }
}
```

You should now be able to use the presence of the user_id on the front-end to "protect" your routes and redirect when necessary. But be sure to look into other ways of implementing login/reg if you're making a production application.
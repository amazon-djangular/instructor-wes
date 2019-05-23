# Live Updating Component Data in Angular
The beauty of Angular is that we can do everything we want with our user interface without ever refreshing the page, but all that user interaction doesn't happen in a vacuum. We have to send data to the server and update our data regularly, but updating that data on the Angular side is unfortunately not automatic. Below, we'll describe a method for updating information live using the Ninja Gold example.

The basic premise is that we need to create an observable, in this case a type of observable called a BehaviorSubject, that our components can watch. The observable has a mechanism through which it can update all subscribed components at once. Neat!

First, let's create a property in our service to store a list of all activities, as well as a property that will store the observable.
```javascript
import { BehaviorSubject } from 'rxjs';
// ...
export class ActivitiesService {
  //...
  activities: object[] = [];
  activities$ = new BehaviorSubject<object[]>([]);
  //...
}
```
There are some new things going on here, along with some crazy syntax. Let's first examine the purpose of both properties at a high level. We've already stated that we'll need an observable object called a BehaviorSubject to update all of our components. We'll cover the syntax of that later. So why do we need activities, which is just an empty list? Activities is a place to store and modify the current state of our data. We don't want to update the behavior subject directly because if we ever want to make small, incremental changes to our data over time, using the behavior subject is a lot more work. So activities is essentially the single source of truth for what our data should look like _right now_. Let's take a look at the syntax for activities$.
```javascript
activities$ = new BehaviorSubject<object[]>([]);
```
We're doing a lot here in this one line, so let's break it down.
  - `activities$` is just a name. We're using the $ to tell other developers that this will be an observable. Otherwise this is meaningless to the code.
  - `new` is the js way of creating a new instance of a class. In this case we're using the BehaviorSubject class.
  - `<object[]>` is us telling typescript that this BehaviorSubject should store an array of objects.
  - `BehaviorSubject([])` is us using the BehaviorSubject constructor to create a new behavior subject that stores an empty array as its initial value.

Now that we have our observable set up as a property, let's modify our service's getActivities() function to update the behavior subject rather than return an observable.
```javascript
getActivities(): void {
  let obs = this.http.get<object[]>(`${this.baseUrl}/1`);
  obs.subscribe((data) => {
    this.activities = activities;
    this.activities$.next(this.activities);
  })
}
```
We're doing the same thing here that we used to do in the component, we're subscribing to the information coming back to us in the .get request and waiting for it to come back to us before we use it. Then we update the activities list as normal. However, there's one modification that you may have noticed.
```javascript
this.activities$.next(this.activities);
```
.next() tells all of the observers of this observable that there is new information and all subscribers waiting for the data to change will run their associated callback function. What we're doing here is saying that activities$ has new data, and it's all the data that's currently in our single source of truth for activities: `this.activities`.

Finally, we need to actually listen for changes to this data on our component.
```javascript
export class ActivityListComponent implements OnInit {
  activities: object[];

  constructor(private activityService: ActivitiesService) { }

  ngOnInit() {
    // listen for updates to activities$
    this.activityService.activities$
      .subscribe((data) => {
        this.activities = data;
      });

    // make the service update activities$
    this.activityService.getActivities();
  }
}
```
Notice here that we're subscribing to `activities$` just as we would typically do with .getActivities(). We are telling our component that it needs to update itself any time activities$ changes (.next() is called) and then we're making our get request to the server and updating activities$ whenever our information gets back to us from the server.

Here's the full working version of both files.
activities.service.ts:
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { LocationsService } from './locations.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  baseUrl: string = 'http://localhost:8000/activities';
  activities: object[] = [];
  activities$ = new BehaviorSubject<object[]>([]);

  constructor(private http: HttpClient) { }

  getActivities(): void {
    let obs = this.http.get<object[]>(`${this.baseUrl}/1`);
    obs.subscribe((data) => {
      this.activities = activities;
      this.activities$.next(this.activities);
    })
  }

  createActivity(locationId: number): void {
    let obs = this.http.post(`${this.baseUrl}/create/`, {
      location_id: locationId,
      user_id: 1
    });
    obs.subscribe((data) => {
      this.getActivities();
    });
  }
}
```
activity-list.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: object[];

  constructor(private activityService: ActivitiesService) { }

  ngOnInit() {
    // listen for updates to activities$
    this.activityService.activities$
      .subscribe((data) => {
        this.activities = data;
      });

    // make the service update activities$
    this.activityService.getActivities();
  }
}
```
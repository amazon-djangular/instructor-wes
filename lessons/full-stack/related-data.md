# Dealing With Related Data
Unfortunately, there isn't a particularly graceful way to deal with related information in Djangular, but there are myriad ways of dealing with said data. Below, we'll cover how one might deal with related data from the Angular side of the equation. It has its flaws, but is typical of a client application requesting data from a RESTful API to deal with information from the front-end. The flaws and potential next-steps will be discussed below.

Let's take a look at an example of the Django views from the ninja gold demo.
```python
# locations
from django.shortcuts import HttpResponse
from .models import Location
from django.core import serializers

# Create your views here.
def index(req):
    locations = Location.objects.all()
    json_locations = serializers.serialize('json', locations)
    return HttpResponse(json_locations, status=200, content_type="application/json")
```
```python
# activities
from django.shortcuts import HttpResponse
from .models import Activity
from django.core import serializers
import json

# Create your views here.
def index(req, user_id):
    activities = Activity.objects.filter(user=user_id).order_by('-created_at')
    json_activities = serializers.serialize('json', activities)
    return HttpResponse(json_activities, status=200, content_type='application/json')
```
What we'd like to do, is create a component that renders data from both the activities and locations tables. Like so:
![Ninja Gold Activities Image](https://github.com/amazon-djangular/instructor-wes/blob/master/lessons/full-stack/activities.png)
Notice how each activity includes information about the activity (gold amount, time), as well as information about the location (location name).

With our current RESTful structure, getting all of the activities would give us the list of activities with an associated location ID, which means we need a way to combine the information of the two respective API calls. This example is clearly using ninja gold, but the following steps can be applied to any Angular app.

1. Inject the locations service into the activities component. Let's assume that getLocations and getActivities will get all locations and all activities (for a given user).

activity-list component:
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { LocationsService } from '../locations.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: object[];

  constructor(
    private activityService: ActivitiesService,
    private locationService: LocationsService
  ) { }
}
```
2. Use the rxjs 'forkJoin' function to get all activities and all locations at once. This step is necessary because both calls are asynchronous. We need data from both calls before we can do _any_ of the work, otherwise there is no guarantee the calls will come back in any order or that they will come back in time for us to merge the data. forkJoin() takes a series of http calls that return observables and make sure they all come back before it runs the callback function. Don't forget to import forkJoin!
```javascript
import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../activities.service';
import { LocationsService } from '../locations.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: object[];

  constructor(
    private activityService: ActivitiesService,
    private locationService: LocationsService
  ) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    forkJoin(
      this.locationService.getLocations(),
      this.activityService.getActivities()
    ).subscribe(([locData, actData]) => {
      console.log(locData);
      console.log(actData);
    })
  }
}
```
3. Use javascript to combine the relevant information. This is where algorithms come in handy. We also must have a solid understanding of the way our data is structured as it comes back from the server. Warning: this part is pretty inefficient. Don't worry, we'll discuss potential optimizations you can make in the future.
```javascript
getActivities() {
  forkJoin(
    this.locationService.getLocations(),
    this.activityService.getActivities()
  ).subscribe(([locations, activities]) => {
    for(let activity of activities) {
      for(let location of locations) {
        if(activity.fields.location === location.pk) {
          console.log('matched!');
          activity.fields.location = location.fields.name;
        }
      }
    }
    this.activities = activities;
  })
}
```
There are javascript built-ins that will greatly decrease the amount of code, but there are also ways of dealing with this on the django side of things. We could even compile all of the information into native python objects formatted the way we'd like it and send it back to the client using json.dumps(). The most optimal way to do this, would be joining the information using SQL, which would be done using a tool like Django Rest Framework to augment the Django ORM. However, we often don't get the luxury of being able to format the data that's being sent back to us from the server, so sometimes we have to do our own merging on the front-end. There are other rxjs operators that would suffice as well, which would require more experience with the rxjs library and Angular as a framework.

So... why is this way so inefficient? Usually, any time we see a nested loop, we're looking at some slow code. In this case, this is because we always have to do `l * a` operations, where l is the number of locations and a is the number of activities. That's because for each activity, we have to look through each location and find the matching value. It's incredibly slow as we increase the size of either array. For small arrays this is plenty fast enough to suffice.
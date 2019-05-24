# Custom Classes in Angular
By now, you've probably seen warnings that look like this:
![Error Message Image](https://github.com/amazon-djangular/instructor-wes/blob/master/lessons/angular/error-message.png)

These errors (and most of the red squigglies you see in your code) are there because typescript is unaware of the structure of our objects. If we use generic types like `object` or `object[]`, we're being type-safe, and that's a good thing! But we're not being safe _enough_ for typescript. Really, we're just not being specific enough. The errors above are there because the generic javascript `object` does not include a property called 'fields' by default. To get around this issue, we can create our own custom classes and interfaces to tell typescript what properties we're expecting to be able to access. Let's take a look at how this works in the context of our ninja gold example.

First, let's have Angular create a new class for us using `ng generate class activity`. This should have created an activity.ts file. Now let's fill this class in with the properties and types we expect to see.

activity.ts
```javascript
export class Activity {
  model: string;
  pk: number;
  fields: {
    gold: number;
    location: number | string;
    user: number;
    created_at: number;
    updated_at: number;
  }
}
```
What we've done is told Angular what to expect from objects that we classify as part of the `Activity` class. This comes into effect when we're stating what we expect to come back from an http call, or when we're setting properties on a service or a component. Let's take a look at a few small examples where this can be used, and don't forget to import this class into your files!

activity-list.component.ts
```javascript
import { Activity } from '../activity';
//...
export class ActivityListComponent implements OnInit {
  activities: Activity[];
  //...
}
```

activities.service.ts
```javascript
import { Activity } from './activity';
//...
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}`);
  }
//...
```

That's it! Now we can use our class everywhere and be extra sure that our data conforms to the format we expect it to when we write our code. If we're attempting to access something that we haven't explicitly enumerated, typescript will conveniently tell us so we can double-check our work.
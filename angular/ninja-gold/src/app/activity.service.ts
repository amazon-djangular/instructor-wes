import { Injectable } from '@angular/core';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activities: Activity[] = [
    {
      id: 1,
      goldAmt: 10,
      createdAt: Date.now(),
      userId: 1,
      locationId: 2
    },
    {
      id: 2,
      goldAmt: -10,
      createdAt: Date.now(),
      userId: 1,
      locationId: 3
    },
  ]

  getActivities(): Activity[] {
    return this.activities;
  }

  constructor() { }
}

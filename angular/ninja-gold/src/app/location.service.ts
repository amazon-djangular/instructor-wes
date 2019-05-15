import { Injectable } from '@angular/core';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: Location[] = [
    {
      id: 1,
      name: 'farm',
      minGold: 10,
      maxGold: 20
    },
    {
      id: 2,
      name: 'cave',
      minGold: 5,
      maxGold: 10
    },
    {
      id: 3,
      name: 'house',
      minGold: 2,
      maxGold: 5
    },
    {
      id: 4,
      name: 'casino',
      minGold: -50,
      maxGold: 50
    },
  ]

  getLocations(): Location[] {
    return this.locations;
  }

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationsArr: object[] = [
    {
      name: 'cave',
      minGold: 5,
      maxGold: 10
    },
    {
      name: 'farm',
      minGold: 2,
      maxGold: 5
    },
    {
      name: 'casino',
      minGold: -50,
      maxGold: 50
    },
  ]

  getLocations(): object[] {
    return this.locationsArr;
  }

  addLocation(location: object): void {
    this.locationsArr.push(location);
  }

  constructor() { }
}

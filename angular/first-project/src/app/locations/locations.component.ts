import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: object[];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locations = this.locationService.getLocations();
  }
}

import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Observable } from 'rxjs';
import { People } from '../people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: object[];

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.people$
      .subscribe(data => {
        this.people = data;
      })
    this.peopleService.getPeople();
  }

}

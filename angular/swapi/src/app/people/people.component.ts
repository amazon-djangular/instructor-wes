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
    let obs: Observable<People> = this.peopleService.getPeople();
    obs.subscribe((data) => {
      console.log(data);
      this.people = data.results;
    });
  }

}

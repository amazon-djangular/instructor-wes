import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {
  searchText: string = '';

  onSearch() {
    this.peopleService.getPeople(this.searchText);
    this.searchText = '';
  }

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { People } from './people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people: object[];
  people$ = new BehaviorSubject<object[]>([]);

  constructor(private http: HttpClient) { }

  getPeople(str: string=''): void {
    this.http.get<People>(`https://swapi.co/api/people/?search=${str}`)
      .subscribe(data => {
        console.log(data.results);
        this.people = data.results;
        this.people$.next(this.people);
      });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from './people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) { }

  getPeople(str: string=''): Observable<People> {
    console.log(str);
    return this.http.get<People>(`https://swapi.co/api/people/?search=${str}`);
  }

  // searchPeople(str: string): Observable<People> {
  //   console.log(this.http.get<People>(`https://swapi.co/api/people/?search=${str}`));
  // }
}

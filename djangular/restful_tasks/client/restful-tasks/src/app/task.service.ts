import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private http: HttpClient) { }

  getTasks(): Observable<object[]> {
    return this.http.get<object[]>('http://localhost:8000/tasks');
  }
}

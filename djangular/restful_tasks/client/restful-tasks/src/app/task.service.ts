import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:8000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(task: Task): void {
    this.http.post<Task>(`${this.baseUrl}/create/`, task)
      .subscribe(data => {
        console.log(data);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: Task = new Task();

  onSubmit() {
    this.taskService.createTask(this.task);
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}

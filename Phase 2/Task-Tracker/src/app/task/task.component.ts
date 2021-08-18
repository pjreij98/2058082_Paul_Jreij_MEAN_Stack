import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from './task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskArray:Array<Task>=[];
  constructor() { }

  addTask(taskRef:NgForm){
    let taskVal = taskRef.value;
    let tsk:Task = {id:taskVal.ID, name:taskVal.Name, taskName:taskVal.task, deadline:taskVal.deadline};
    this.taskArray.push(tsk);
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { List } from '../list';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  currentList: List;
  currentTask: Task;
  task: Task;
  taskId: number = 0;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentList.subscribe(alist => this.currentList = alist);
    this.data.currentTask.subscribe(atask => this.currentTask = atask);
    this.data.getUpdate();
  }

  saveTask(taskName: string, event) {
    this.task = {id: this.taskId++, name: taskName, status: true, isFinished: false, steps: []};
    event.target.value = null;
    this.currentList.tasks.push(this.task);
    this.data.updateList(this.currentList);
    this.data.setUpdate(this.currentList)
  }

  updateTaskAsFinished(task: Task) {
    if (task.isFinished) {
      task.isFinished = false;
    } else {
      task.isFinished = true;
    }
  }

  showStepsBar(task: Task) {
    this.data.updateTask(task);
    document.querySelector(".backIcon").value = 'open';
    if (document.querySelector(".sideBarButton").value == 'open') {
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv taskDivClose");
      document.querySelector(".stepsBar").setAttribute("class", "stepsBar stepsBarOpen");
    } else {
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv taskDitaskDivPartialFull");
      document.querySelector(".stepsBar").setAttribute("class", "stepsBar stepsBarOpen");
    }	
  }
}

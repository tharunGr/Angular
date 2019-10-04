import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from './list';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  list: List;
  private activeList = new BehaviorSubject(this.list);
  currentList = this.activeList.asObservable();

  task: Task;
  private activeTask = new BehaviorSubject(this.task);
  currentTask = this.activeTask.asObservable();

  constructor() { }

  updateList(newCurrentList: List) {
    this.activeList.next(newCurrentList);
  }

  updateTask(newCurrentTask: Task) {
    this.activeTask.next(newCurrentTask);
  }
  setUpdate(data){
  
  this.currentList=data;   
  }
  getUpdate(){
    return this.currentList;
  }
}

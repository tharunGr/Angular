import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { List } from '../list';
import { TaskComponent } from '../task/task.component';
import { ListCollection } from '../list-collection';
import { DataService } from '../data.service';
import { OutletContext } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

  todoListForDisplay: List[];
  listCollection: ListCollection = {todoList: []};
  list: List;
  listId: number = 0;
  sideButton: boolean = true;
  sideBarButtonValue: string = "open";
  @Input() taskBar: TaskComponent;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentList.subscribe((alist) => this.list = alist);
  }

  /**
   * Toggle the side menu button.
   * 
   * @param event Event to get value of that toggling button.
   */
  toggleSideMenu(event) {
    if (event.currentTarget.value == "open") {
      this.sideButton = false;
      this.taskBar.taskBarToggle = "taskDiv taskDivFull";
      event.currentTarget.value = "close";
    } else {
      this.sideButton = true;
      this.taskBar.taskBarToggle = "taskDiv";
      event.currentTarget.value = "open";
    }
  }

  /**
   * Saves new list and its details.
   * 
   * @param listName List name to create new list.
   * @param event Event to null the input text box.
   */
  saveList(listName: string, event) {
    if (listName != "") {
      this.list = {id: this.listId++, name: listName, status: true, tasks: []};
      event.target.value = null;
      this.listCollection.todoList.push(this.list);
      this.todoListForDisplay = this.listCollection.todoList;
      this.data.updateList(this.list);
    }
  }

  /**
   * Update the list as active list.
   * 
   * @param list List to be updated in data service.
   */
  showListDetailInTask(list: List) {
    this.data.updateList(list);
  }

  /**
   * 
   * @param list Count number of unfinished tasks does list has.
   */
  taskCount(list: List) {
    return list.tasks.filter(task => false == task.isFinished).length; 
  }
}

import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { TaskComponent } from '../task/task.component';
import { ListCollection } from '../list-collection';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

  todoListForDisplay: List[];
  listCollection: ListCollection = {todoList: []};
  taskCount: number = 0;
  list: List;
  listId: number = 0;
  sideButton: boolean = true;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentList.subscribe((alist) => this.list = alist);
  }

  toggleSideMenu(event) {
    if (event.currentTarget.value == "open") {
      this.sideButton = false;
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv taskDivFull");
      event.currentTarget.value = "close";
    } else {
      this.sideButton = true;
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv");
      event.currentTarget.value = "open";
    }
  }

  saveList(listName: string, event) {
    if (listName != "") {
      this.list = {id: this.listId++, name: listName, status: true, tasks: []};
      event.target.value = null;
      this.listCollection.todoList.push(this.list);
      this.todoListForDisplay = this.listCollection.todoList;
      this.data.updateList(this.list);
    }
  }

  showListDetailInTask(list: List) {
    this.data.updateList(list);
  }
}

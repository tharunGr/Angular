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
  list: List;
  listId: number = 0;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentList.subscribe((alist) => this.list = alist)
  }

  toggleSideMenu(event) {
    if (event.currentTarget.value == "open") {
      document.querySelector(".sidePanel").setAttribute("class", "sidePanel sidePanelClose");
      document.querySelector(".newListInput").setAttribute("class", "newListInput newListInputClose");
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv taskDivFull");
      document.querySelectorAll(".sidePanalText").forEach(element => {
        element.setAttribute("class", "sidePanalTextClose");
      });
      event.currentTarget.value = "close";
    } else {
      document.querySelector(".sidePanel").setAttribute("class", "sidePanel");
      document.querySelector(".newListInput").setAttribute("class", "newListInput");
      document.querySelector(".taskDiv").setAttribute("class", "taskDiv");
      document.querySelectorAll(".sidePanalTextClose").forEach(element => {
        element.setAttribute("class", "sidePanalText");
      });
      event.currentTarget.value = "open";
    }
  }

  saveList(listName: string, event) {
    this.list = {id: this.listId++, name: listName, status: true, tasks: []};
    event.target.value = null;
    this.listCollection.todoList.push(this.list);
    this.todoListForDisplay = this.listCollection.todoList;
    this.data.updateList(this.list);
    }

  showListDetailInTask(list: List) {
    this.data.updateList(list);
  }
}

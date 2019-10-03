import { Component, OnInit } from '@angular/core';
import { List } from '../list';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnInit {

  todoLists: List[];
  list: List;
  listId: number = 0;
  taskComponent: TaskComponent;

  constructor() {
  }

  ngOnInit() {

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
    this.list = {id: this.listId++, name: listName, status: true};
    this.taskComponent.displayListNameInTask(listName);
    event.target.value = null;
    if (this.todoLists == null) {
      this.todoLists = [];
      this.todoLists.push(this.list);  
    } else {
      this.todoLists.push(this.list);
    }
  }
}

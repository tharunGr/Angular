import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import { List } from '../list';
import { DataService } from '../data.service';
import { ListCollection } from '../list-collection';
import { SidepanelComponent } from '../sidepanel/sidepanel.component';
import { StepComponent } from '../step/step.component';

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
  taskBarToggle: string = "taskDiv";
  @Input() sidePanel: SidepanelComponent;
  @Input() stepBar: StepComponent;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentList.subscribe(alist => this.currentList = alist);
    this.data.currentTask.subscribe(atask => this.currentTask = atask);
  }

  /**
   * Saves the new Task.
   * 
   * @param taskName Task name for  new task to be created. 
   * @param event Event to null the input text box.
   */
  saveTask(taskName: string, event) {
    if ((taskName != "") && (this.sidePanel.listCollection.todoList != null)) {
      this.task = {id: this.taskId++, name: taskName, status: true, isFinished: false, steps: []};
      event.target.value = null;
      this.currentList.tasks.push(this.task);
      this.data.updateList(this.currentList);
      this.data.setUpdate(this.currentList)
    }
  }

  /**
   * Checked or Unchecked the task.
   * 
   * @param task Task to be checked or unchecked.
   */
  updateTaskAsFinished(task: Task) {
    if (task.isFinished) {
      task.isFinished = false;
    } else {
      task.isFinished = true;
    }
  }

  /**
   * Displays task's step details.
   * 
   * @param task Task's steps shown in step menu.
   */
  showStepsBar(task: Task) {
    this.data.updateTask(task);
    this.stepBar.backButtonValue = "open";
    if (this.sidePanel.sideBarButtonValue == 'open') {
      this.taskBarToggle = "taskDiv taskDivClose";
      document.querySelector(".stepsBar").setAttribute("class", "stepsBar stepsBarOpen");
    } else {
      this.taskBarToggle = "taskDiv taskDivPartialFull";
      document.querySelector(".stepsBar").setAttribute("class", "stepsBar stepsBarOpen");
    }	
  }

  /**
   * Updating the list's name.
   * 
   * @param editListName Editing the active list's name. 
   */
  editList(editListName, event) {
    this.currentList.name = editListName;
  }

  /**
   * Deletes the current list.
   */
  deleteList() {
    if (confirm("Do you want to delete the list ?")) {
      this.sidePanel.listCollection.todoList.splice(this.sidePanel.listCollection.todoList.indexOf(this.currentList), 1);
    }
  }

  stepCount(task: Task) {
    return task.steps.filter(step => true == step.isFinished).length + " of " + task.steps.length;
  }
}

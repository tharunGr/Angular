import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { DataService } from '../data.service';
import { Step } from '../step';
import { List } from '../list';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  currentList: List;
  currentTask: Task;
  step: Step;
  stepId: number = 0;
  backButtonValue: string = "close";
  stepBarToggle: string = "stepsBar";
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentList.subscribe(alist => this.currentList = alist);
    this.data.currentTask.subscribe(atask => this.currentTask = atask);
  }

  /**
   * Checked or Unchecked the task.
   */
  updateTaskAsFinished() {
    if (this.currentTask.isFinished) {
      this.currentTask.isFinished = false;
    } else {
      this.currentTask.isFinished = true;
    }
  }

  /**
   * Saves the new list.
   * 
   * @param stepName Step name for new step to be created. 
   * @param event Event to null the input text box.
   */
  saveStep(stepName: string, event) {
    if (stepName != "") {
      this.step = {id: this.stepId++, name: stepName, isFinished: false};
      event.target.value = null;
      this.currentTask.steps.push(this.step);
    }
  }

  /**
   * Checked or Unchecked the step.
   * 
   * @param step Step to be checked or unchecked.
   */
  updateStepAsFinished(step: Step) {
    if (step.isFinished) {
      step.isFinished = false;
    } else {
      step.isFinished = true;
    }
  }

  /**
   * Deletes the current task.
   */
  deleteTask() {
    if (confirm("Do you want to delete the task ?")) {
      this.currentList.tasks.splice(this.currentList.tasks.indexOf(this.currentTask), 1);
    } 
  }

  /**
   * Deletes the current step.
   */
  deleteStep(step: Step) {
    if (confirm("Do you want to delete the step ?")) {
      this.currentTask.steps.splice(this.currentTask.steps.indexOf(step), 1);
    } 
  }

  /**
   * Updating the task's name.
   * 
   * @param editTaskName Editing the active task's name. 
   */
  editTask(editTaskName, event) {
    this.currentTask.name = editTaskName;
  }

  /**
   * Updating the step's name.
   * 
   * @param editStepName Editing the active step's name. 
   */
  editStep(step: Step, editStepName, event) {
    step.name = editStepName;
  }
}

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
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentList.subscribe(alist => this.currentList = alist);
    this.data.currentTask.subscribe(atask => this.currentTask = atask);
  }

  updateTaskAsFinished(task: Task) {
    if (task.isFinished) {
      task.isFinished = false;
    } else {
      task.isFinished = true;
    }
  }

  saveStep(stepName: string, event) {
    if (stepName != "") {
      this.step = {id: this.stepId++, name: stepName, isFinished: false};
      event.target.value = null;
      this.currentTask.steps.push(this.step);
    }
  }

  updateStepAsFinished(step: Step) {
    if (step.isFinished) {
      step.isFinished = false;
    } else {
      step.isFinished = true;
    }
  }

  deleteTask() {
    if (confirm("Do you want to delete the task ?")) {
      this.currentList.tasks.splice(this.currentList.tasks.indexOf(this.currentTask), 1);
    } 
  }

  deleteStep(step: Step) {
    if (confirm("Do you want to delete the step ?")) {
      this.currentTask.steps.splice(this.currentTask.steps.indexOf(step), 1);
    } 
  }

  editTask(editTaskName, event) {
    this.currentTask.name = editTaskName;
  }

  editStep(step: Step, editStepName, event) {
    step.name = editStepName;
  }
}

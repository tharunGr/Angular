import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { DataService } from '../data.service';
import { Step } from '../step';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  currentTask: Task;
  step: Step;
  stepId: number;
  
  constructor(private data: DataService) { }

  ngOnInit() {
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
    this.step = {id: this.stepId++, name: stepName, isFinished: false};
    event.target.value = null;
    this.currentTask.steps.push(this.step);
  }

  updateStepAsFinished(step: Step) {
    if (step.isFinished) {
      step.isFinished = false;
    } else {
      step.isFinished = true;
    }
  }
}

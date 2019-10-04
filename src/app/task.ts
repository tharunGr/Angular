import { Step } from './step';

export class Task {
  id: number;
  name: string;
  status: boolean;
  isFinished: boolean;
  steps: Step[];
}

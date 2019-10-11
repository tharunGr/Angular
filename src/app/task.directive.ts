import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTask]'
})
export class TaskDirective {

  constructor(private element: ElementRef) { }

  @HostListener("focus") OnFocus() {
    this.element.nativeElement.placeholder = ""
  }

  @HostListener("focusout") OnFocusOut() {
    this.element.nativeElement.placeholder = "Add task"
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { TaskComponent } from './task/task.component';
import { StepComponent } from './step/step.component';
import { TaskDirective } from './task.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidepanelComponent,
    TaskComponent,
    StepComponent,
    TaskDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

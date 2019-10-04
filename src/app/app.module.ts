import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidepanelComponent } from './sidepanel/sidepanel.component';
import { TaskComponent } from './task/task.component';
import { StepComponent } from './step/step.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidepanelComponent,
    TaskComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

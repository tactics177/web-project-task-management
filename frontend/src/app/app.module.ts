import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectService } from './services/projects.service';
import {AppRoutingModule} from "./app-routing.module";
import {ProjectsComponent} from "./projects/projects.component";

@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

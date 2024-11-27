import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ProjectService} from './services/projects.service';
import {AppRoutingModule} from "./app-routing.module";
import {ProjectsComponent} from "./projects/projects.component";
import {TaskCardComponent} from './task-card/task-card.component';
import {TaskBoardComponent} from './task-board/task-board.component';
import {ProjectListComponent} from "./components/project-list/project-list.component";


@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    ProjectsComponent,
    TaskCardComponent,
    TaskBoardComponent,
    ProjectListComponent
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
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AppComponent} from './app.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ProjectService} from './services/projects.service';
import {AppRoutingModule} from "./app-routing.module";
import {ProjectsComponent} from "./projects/projects.component";
import {ProjectListComponent} from "./components/project-list/project-list.component";
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateProjectComponent,
    ProjectsComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    TaskCardComponent,
    TaskBoardComponent,
    ProjectListComponent,
    NavbarComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Important for chaining multiple interceptors
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

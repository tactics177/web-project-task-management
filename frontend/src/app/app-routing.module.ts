import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ProjectsComponent} from './projects/projects.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LoginComponent} from './components/auth/login/login.component';
import {TaskBoardComponent} from './task-board/task-board.component';
import {EditProjectComponent} from "./components/edit-project/edit-project.component";


const routes: Routes = [
  {path: 'create-project', component: CreateProjectComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'edit-project/:id', component: EditProjectComponent},
  {path: '', redirectTo: '/projects', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tasks-board', component: TaskBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

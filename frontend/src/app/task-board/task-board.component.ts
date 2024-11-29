import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  tasks: any[] = [];
  projectId: string | null = null;
  //userId = '6745a01ff1cd749f344791b3'; // replace with logged in user id
  userId = localStorage.getItem('id') as string

  constructor(private tasksService: TasksService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    //this.fetchTasks();
    this.projectId = this.route.snapshot.paramMap.get('projectId') as string;
    localStorage.setItem("projectId", this.projectId)
    if (this.projectId) {
      this.fetchTasksByProject(this.projectId);
    }
  }

  fetchTasks(): void {
    this.tasksService.getTasksByUser(this.userId).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  getTasksByStatus(status: string): any[] {
    return this.tasks.filter((task) => task.status === status);
  }


  fetchTasksByProject(projectId: string): void {
    this.tasksService.getTasksByProject(projectId).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
  // code for create-task-formular
  showFormular = false

  acceptEmitF(event:boolean){
    //console.log("Accept emit formular working")
    this.showFormular = event
  }
  acceptEmitCloseF(event:boolean){
    this.showFormular = event

  }
}

import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  tasks: any[] = [];
  userId = '6745a01ff1cd749f344791b3'; // replace with logged in user id

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.fetchTasks();
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
}

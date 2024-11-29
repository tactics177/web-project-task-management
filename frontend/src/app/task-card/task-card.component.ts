import { Component, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: any;

  isEditing: boolean = false;
  editableTask: any = {};

  constructor(private tasksService: TasksService) {}

  enableEditing(): void {
    this.isEditing = true;
    this.editableTask = { ...this.task };
  }

  saveChanges(): void {
    const updatableFields = {
      title: this.editableTask.title,
      description: this.editableTask.description,
      priority: this.editableTask.priority,
      status: this.editableTask.status,
      dueDate: this.editableTask.dueDate
        ? new Date(this.editableTask.dueDate).toISOString()
        : null,
      tags: this.editableTask.tags,
      projectId: this.editableTask.projectId,
      assignedToId: this.editableTask.assignedToId,
      parentId: this.editableTask.parentId,
    };
  
    this.tasksService.updateTask(this.editableTask.id, updatableFields).subscribe({
      next: (updatedTask) => {
        this.isEditing = false;
        this.task = updatedTask; 
      },
      error: (error) => {
        console.error('Failed to update task:', error);
      },
    });
  }  

  cancelEditing(): void {
    this.isEditing = false;
    this.editableTask = { ...this.task };
  }
}

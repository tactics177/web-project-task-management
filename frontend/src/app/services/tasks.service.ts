import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTasksByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/user/${userId}`);
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/tasks/${taskId}`, updatedTask);
  }

  getTasksByProject(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/project/${projectId}`);
  }
}

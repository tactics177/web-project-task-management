import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task, userForTask } from './types';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = 'http://localhost:3000';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTasksByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/user/${userId}`);
  }

  getAllUsersToAssignTask(): Observable<userForTask[]>{
    return this.http.get<userForTask[]>(`${this.baseUrl}/users/usersForTask`, {headers: this.headers})
  }

  createTask(task: task): Observable<any>{
    return this.http.post<task>(`${this.baseUrl}/tasks`, JSON.stringify(task), {headers: this.headers})
  }

  updateTask(taskId: string, updatedTask: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/tasks/${taskId}`, updatedTask);
  }

  getTasksByProject(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks/project/${projectId}`);
  }
}

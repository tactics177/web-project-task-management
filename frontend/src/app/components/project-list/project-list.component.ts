import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/projects.model";
import {ProjectService} from "../../services/projects.service";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(project => project.id !== id);
    });
  }
}

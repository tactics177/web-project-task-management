import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "../../models/projects.model";
import {ProjectService} from "../../services/projects.service";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe((project) => {
        this.project = project;
      });
    }
  }

  saveProject(): void {
    if (this.project) {
      this.projectService.updateProject(this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }

}

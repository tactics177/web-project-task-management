import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/projects.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      ownerId: [localStorage.getItem('id')],
    });
  }


  onsubmit() {
    if (this.projectForm.valid) {
     this.router.navigate(['/projects']);
      this.projectService.createProject(this.projectForm.value).subscribe(response => {
        console.log(response);

      }, error => {
        console.error(error);
      });
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { task, userForTask } from 'src/app/services/types';

@Component({
  selector: 'app-create-task-formular',
  templateUrl: './create-task-formular.component.html',
  styleUrls: ['./create-task-formular.component.scss']
})
export class CreateTaskFormularComponent {

  @Output() emitCloseF = new EventEmitter<boolean>()

  createTaskForm!: FormGroup;

  availableTags = ["back", "front", "database"]

  //users = ["roma", "ali", "gregoire"]

  tags: string[] = []; // Array to hold user-added tags
  tagInput: string = ''; // Temporary input for the tag being typed

  taskToCreate!: task

  users!: userForTask[]


  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.taskService.getAllUsersToAssignTask().subscribe(
      (response:any) => {
        console.log(`Users to assign tasks: ${JSON.stringify(response)}`)
        this.users = response
      },
      (error) => {
        console.log(error)
        alert("Something went wrong, could not get all users for task assignation ...")
      }
    )

    this.createTaskForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      priority: new FormControl('', [Validators.required, Validators.minLength(1)]),
      status: new FormControl('', [Validators.required]),
      tags: new FormControl(this.tags, [Validators.required, Validators.minLength(1)]),
      assignedTo: new FormControl('', [Validators.required]),
    })
  }
   // Add a new tag to the list
   addTag(): void {
    if (this.tagInput.trim() && !this.tags.includes(this.tagInput.trim())) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
      this.createTaskForm.get('tags')?.setValue(this.tags);
      this.createTaskForm.get('tags')?.markAsTouched();
      console.log(`Tag input: ${this.tags}`)
    }
  }
  // Remove a tag from the list
  removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.createTaskForm.get('tags')?.setValue(this.tags);
    this.createTaskForm.get('tags')?.markAsTouched();
  }

  createTask(){
    if (this.createTaskForm.invalid) return;

    //const projectId = this.route.snapshot.paramMap.get('id') as string;
    const projectId = localStorage.getItem("projectId") as string


    this.taskToCreate = {
      title: this.createTaskForm.value.title,
      description: this.createTaskForm.value.description,
      status: this.createTaskForm.value.status,
      tags: this.createTaskForm.value.tags,
      priority: this.createTaskForm.value.priority,
      assignedTo: {
        name: this.createTaskForm.value.assignedTo.name,
        email: this.createTaskForm.value.assignedTo.email
    },
    projectId: projectId,
  }
    console.log(`Task form: ${JSON.stringify(this.taskToCreate)}`)

    this.taskService.createTask(this.taskToCreate).subscribe(
      (response:any) => {
        console.log(`Created task: ${JSON.stringify(response)}`)
      },
      (error) => {
        console.log(error)
        alert("Something went wrong, could not create a new task ...")
      })

    // this.authService.register({
    //   name: this.registerForm.value.name,
    //   email: this.registerForm.value.email,
    //   password: this.registerForm.value.password
    // });
  }

  closeFormular(){
    return this.emitCloseF.emit(false)
  }
}

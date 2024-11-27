import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: [this.authService.checkPasswords, this.authService.checkForbidenWords] });
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.register({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    });
  }

  get getErrorLabel() {
    if (this.registerForm.errors?.['required']) return 'The fields are obligatory';
    if (this.registerForm.controls?.['email']) return 'Invalid email';
    if (!!this.registerForm.controls?.['password']?.errors?.['minlength']) return `The minimum length of your password is ${this.registerForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (this.registerForm.errors?.['missMatch']) return 'The passwords are different';
    if (this.registerForm.errors?.['forbidden']) return 'Forbidden name';
    return 'Please enter valid credentials';
  }
}
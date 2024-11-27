import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { loginUser} from 'src/app/services/types';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  loginForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, { validators: [this.authservice.checkForbidenWords] });
  }

  noLogin = false

  user!: loginUser

  onSubmit(){
    if (this.loginForm.invalid) return;
    //const user: loginUser = {email: this.loginForm.value.email!, password: this.loginForm.value.password!}
    //console.log(`Login user ${JSON.stringify(user)}`)
    this.authservice.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  get getErrorLabel() {
    if (this.loginForm.errors?.['required']) return 'The fields are obligatory';
    if (this.loginForm.controls?.['email']) return 'Invalid email';
    if (!!this.loginForm.controls?.['password']?.errors?.['minlength']) return `The minimum length of your password is ${this.loginForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (this.loginForm.errors?.['forbidden']) return 'Forbidden name';
    return 'Please enter valid credentials';
  }
}

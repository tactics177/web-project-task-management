import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registeredUser, loginUser, signedUser} from '../types';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              ) { }
  
  user!: registeredUser
  loginUser!: loginUser
  signedUser!: signedUser
  token!: string

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  register(user: registeredUser){
    console.log(`User in register: ${JSON.stringify(user)}`)
    this.http.post('http://localhost:3000/register', JSON.stringify(user), {headers: this.headers}).subscribe(
      (response:any) => {
        console.log(`Response in auth service register: ${JSON.stringify(response)}`)
        const user = response?.user
        if (user.hasOwnProperty('id')){
          this.router.navigate(['login']);
        }
      },
      (error) => {
        console.log(error)
        alert("Something went wrong, could not register ...")
      }
    )
  }

  login(user: loginUser){
    console.log(`User in auth: ${JSON.stringify(user)}`)
    this.http.post('http://localhost:3000/login', JSON.stringify(user), {headers: this.headers}).subscribe(
      (response:any) => {
        console.log(`Response in auth service login: ${JSON.stringify(response)}`)
        if(response.length !== 0){
          this.signedUser = {
            id: response?.user?.id,
            email: response?.user?.email,
            token : response?.accessToken
          }
          localStorage.setItem('email', this.signedUser.email)
          localStorage.setItem('id', this.signedUser.id)
          localStorage.setItem('token', this.signedUser.token)
          this.router.navigate(['']);
          console.log(`Response in auth service login: ${response}`)
          console.log(`Items in local storage: `)
          console.log(localStorage.getItem("email"))
          console.log(localStorage.getItem("id"))
          console.log(localStorage.getItem("token"))
        }
        else{
          alert("Incorrect name or password")
        }
      },
      (error) => {
        console.log("Login error")
        console.log(error)
      })
  }

  logout(){
    if (localStorage.getItem('token')){
      localStorage.setItem('email', '')
      localStorage.setItem('id', '')
      localStorage.setItem('token', '')
      this.router.navigate(['login'])
      console.log("Logout in auth service working")
      console.log(`Token after logout: ${localStorage.getItem("token")}`)
    } else {
      alert("You are not signed in!")
    }
  }

  // Adidtional functions to check the correctness of user input
  checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { missMatch: true } : null;
  }

  checkForbidenWords(control: FormGroup) {
    const forbidenWords = ['admin']
    const name = control.get('name');
    return forbidenWords.includes(name?.value.toLowerCase()) ? {forbidden: true} : null;
  }


}

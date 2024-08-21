import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  msgError:string = ""

  loginForm:FormGroup = this.FormBuilder.group({
    email: [null , [Validators.required , Validators.email]],
    password: [null , [Validators.required , Validators.pattern(/^[a-zA-z0-9]{4,}$/)]]
  })


  login(){

    this._AuthService.login(this.loginForm.value).subscribe({
      next: (res)=>{
        this.msgError = ""
        localStorage.setItem("token" , res.token)
        this._Router.navigate(['/home'])
        this._AuthService.isLoggedIn = true
        console.log(this._AuthService.isLoggedIn);
      },
      error: (err)=>{
        this.msgError = err.error.msg
        console.log(this.msgError);
      }
    })

    console.log(this.loginForm);
    
  }
}

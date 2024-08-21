import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { log } from 'console';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}

  errMsg:any

  registerForm:FormGroup = new FormGroup({

    name:new FormControl(null , [Validators.required , Validators.minLength(3)]),
    
    email:new FormControl(null , [Validators.required , Validators.email]),
    
    password:new FormControl(null , [Validators.required , Validators.pattern(/^[a-zA-z0-9]{4,}$/)]),
    
    age:new FormControl(null , [Validators.required , Validators.min(20)]),
    
    phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0,9]{8}$/)]),
  })

  register(){
    console.log(this.registerForm.value);
    
    if(this.registerForm.valid){

      this._AuthService.register(this.registerForm.value).subscribe({
        next:(res)=>{
          this._Router.navigate(['/login'])
        },  
        error:(err)=>{
        this.errMsg = err.error.msg
        console.log(this.errMsg);
        
        
        }
      })
    }
  }
}

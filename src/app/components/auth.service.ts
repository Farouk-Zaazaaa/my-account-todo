import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  private readonly _Router = inject(Router)

  isLoggedIn!: boolean

  register(data:any):Observable<any>{
    return this._HttpClient.post("https://note-sigma-black.vercel.app/api/v1/users/signUp" , data)
  }

  login(data:any):Observable<any>{
    return this._HttpClient.post("https://note-sigma-black.vercel.app/api/v1/users/signIn" , data)
  }

  logout(){
    localStorage.removeItem("token")

    this._Router.navigate(["/login"])

    this.isLoggedIn=false
  }

  
}

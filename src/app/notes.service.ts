import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }

  headersTok:any = {token: "3b8ny__" +  localStorage.getItem("token")}

  addNote(data:any):Observable<any>{
    return this._HttpClient.post("https://note-sigma-black.vercel.app/api/v1/notes" , data , 
      {
        headers: this.headersTok
      }
    )
  }

  getNotes():Observable<any>{
    return this._HttpClient.get("https://note-sigma-black.vercel.app/api/v1/notes" , 
      {
        headers : this.headersTok
      }
    )
  }

  deleteNote(id:number):Observable<any> {
    return this._HttpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` , 
      {
        headers: this.headersTok
      }
    )
  }

  updateNote(id:any , data:any):Observable<any> {
    return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` , data , 
      {
        headers: this.headersTok
      }
    )
  }


}

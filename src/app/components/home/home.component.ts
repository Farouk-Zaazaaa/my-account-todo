import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../notes.service';

declare var $:any


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
    

    this.getUserNotes()
  }

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _NotesService = inject(NotesService)

  noteList:any

  addNoteForm:FormGroup = this._FormBuilder.group({
    title: [ null , [Validators.required]] ,
    content: [ null , [Validators.required]]
  })

  updateNoteForm:FormGroup = this._FormBuilder.group({
    _id : [null],
    title: [ null , [Validators.required]] ,
    content: [ null , [Validators.required]]
  })

  addNote(){
    console.log(this.addNoteForm.value);

    this._NotesService.addNote(this.addNoteForm.value).subscribe({
      next:(res) => {console.log(res);
        this.addNoteForm.reset()
        $("#exampleModal").modal("hide")
        this.getUserNotes()
      },
      error: (err)=> {console.log(err);
      }
    })
    
  }

  getUserNotes(){

    this._NotesService.getNotes().subscribe({
      next: (res)=>{
        this.noteList = res.notes
        console.log(this.noteList);
        
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }

  deleteNote(id:number) {
    this._NotesService.deleteNote(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserNotes()
        console.log(this.noteList);
        
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  setUpdateNote(note:any){
    console.log(note);
    
    this.updateNoteForm.patchValue(note)
    $("#updateModal").modal("show")
  }

  updateNote(){

    const {title , content , _id} = this.updateNoteForm.value

    this._NotesService.updateNote( _id , {content , title}).subscribe({
      next: (res)=>{
        console.log(res);
        this.getUserNotes()
        $("#updateModal").modal("hide")
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }
}

import { Injectable } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Note } from 'src/app/models/note.model';
import { Notes } from '../../data/notes.data';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly _notes = new BehaviorSubject<Note[]>(Notes);
  notes = this._notes.asObservable();

  private readonly _noteByDate = new BehaviorSubject<Note[]>([]);
  noteByDate = this._noteByDate.asObservable();

  private readonly _editedNote = new BehaviorSubject<Note>(new Note());
  editedNote = this._editedNote.asObservable();

  private id = 2;

  constructor() {  }

  addNote(note: Note) {
    this._notes.next( [...this._notes.getValue(), { ...note, id: this.id } ]);
    ++this.id;
  }

  getNotes() {
    return this._notes.getValue();
  }

  removeNote(note: Note) {
    this._notes.next( this._notes.getValue().filter(n => n.id !== note.id) );
  }

  patchNote(note: Note) {
    const idx = this._notes.getValue().findIndex(n => n.id === note.id);
    if (idx !== -1) {
      this._notes.getValue()[idx] = note;
      this._notes.next(this._notes.getValue());
    }
  }

  editNote(note: Note) {
    this._editedNote.next(note);
  }

  compareDates(noteDate: Date, comparedDate: Date) {
    return noteDate.getDate() === comparedDate.getDate() && noteDate.getMonth() === comparedDate.getMonth() && noteDate.getFullYear() === comparedDate.getFullYear();
  }
}

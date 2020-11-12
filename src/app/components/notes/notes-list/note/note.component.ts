import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../../../../models/note.model';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { calculatedLightnessColor } from 'src/app/util/lightness-color.util';
import { deleteNote, expandDescription } from 'src/app/animations/transitions.animation';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [deleteNote, expandDescription]
})

export class NoteComponent implements OnInit {

  @Input() note: Note;

  @Output() noteToDelete = new EventEmitter<Note>();

  areDetailsDisplayed = false;
  expandState = 'collapse';
  onDeleteAnimation = 'idle';

  constructor(private router: Router, private notesService: NotesService) { }

  ngOnInit() {
  }

  showDetails() {
    this.expandState = this.expandState === 'collapse' ? 'expand' : 'collapse';
    this.areDetailsDisplayed = !this.areDetailsDisplayed;
  }

  lightenColor(color: string, value: number) {
    return calculatedLightnessColor(color, value);
  }

  editNote() {
    this.notesService.editNote(this.note);
    this.router.navigate(['add-note']);
  }

  deleteNote() {
    this.onDeleteAnimation = 'delete';
    setTimeout(() => {
      this.noteToDelete.emit(this.note);
    }, 250);
  }

}

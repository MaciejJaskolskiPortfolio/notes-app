import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.scss']
})
export class NotesHomeComponent implements OnInit {

  dateChangedTrigger = false;

  constructor(private router: Router, private notesService: NotesService) { }

  ngOnInit() {

  }

  navigateToProfile() {
    this.router.navigate(['profile']);
  }

  navigateToNoteForm() {
    this.notesService.editNote(new Note());
    this.router.navigate(['add-note']);
  }
}

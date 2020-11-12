import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { deleteNote } from 'src/app/animations/transitions.animation';
import { Note } from 'src/app/models/note.model';
import { CurrentDateService } from 'src/app/services/current-date/current-date.service';
import { NotesService } from 'src/app/services/notes-service/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [deleteNote]
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[] = [];
  sub: Subscription;

  constructor(private noteService: NotesService, private currentDayService: CurrentDateService) { }

  ngOnInit() {
    this.sub = this.currentDayService.currentDate.subscribe(d => {
      this.noteService.notes.subscribe(n => {
        this.notes = n.filter(nn => this.noteService.compareDates(nn.date, d));
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  deleteNote(note: Note) {
    this.noteService.removeNote(note);
  }

}

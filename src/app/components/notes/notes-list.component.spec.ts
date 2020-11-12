import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Notes } from 'src/app/data/notes.data';
import { Note } from 'src/app/models/note.model';
import { MaterialModule } from 'src/app/modules/material.module';
import { CurrentDateService } from 'src/app/services/current-date/current-date.service';
import { NotesService } from 'src/app/services/notes-service/notes.service';

import { NotesListComponent } from './notes-list.component';
import { NoteComponent } from './notes-list/note/note.component';

describe('NotesListComponent', () => {
  let component: NotesListComponent;
  let fixture: ComponentFixture<NotesListComponent>;
  let noteService: NotesService;
  let currentDayService: CurrentDateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesListComponent, NoteComponent],
      imports: [MaterialModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [ NotesService, CurrentDateService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesListComponent);
    component = fixture.componentInstance;
    noteService = fixture.debugElement.injector.get(NotesService);
    currentDayService = fixture.debugElement.injector.get(CurrentDateService);
    component.sub = new Subscription();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'noteService.removeNote\' on deleteNote()', () => {
    const noteServiceSpy = spyOn(noteService, 'removeNote').and.callThrough();
    component.deleteNote(new Note());
    expect(noteServiceSpy).toHaveBeenCalled();
  });

  it('should call \'noteService.removeNote\' on deleteNote() with same value', () => {
    const noteServiceSpy = spyOn(noteService, 'removeNote').and.callThrough();
    component.deleteNote(Notes[0]);
    expect(noteServiceSpy).toHaveBeenCalledWith(Notes[0]);
  });

  it('should unsubscribe in to sub in \'ngOnDestroy\'', () => {
    const subSpy = spyOn(Subscription.prototype, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalled();
  });

  it('should display \'No notes to display.\' if there are no notes', () => {
    component.notes = [];
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const note = fixture.nativeElement.querySelector('p');
      expect(note.innerHTML).toBe('No notes to display.');
    });
  });

  it('should display app-note if there are notes', () => {
    const note = fixture.nativeElement.querySelector('app-note');
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      expect(note).toBeTruthy();
    });
  });
});

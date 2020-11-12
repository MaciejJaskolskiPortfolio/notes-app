import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Notes } from 'src/app/data/notes.data';
import { Note } from 'src/app/models/note.model';
import { MaterialModule } from 'src/app/modules/material.module';
import { NotesService } from 'src/app/services/notes-service/notes.service';

import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let noteService: NotesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteComponent, MockComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes(routes), BrowserAnimationsModule],
      providers: [ NotesService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    component.note = Notes[0];
    noteService = fixture.debugElement.injector.get(NotesService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call \'notesService.editNote\' when editNote method is called', () => {
    const spy = spyOn(noteService, 'editNote').and.callThrough();
    component.editNote();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call \'notesService.editNote\' with given note value', () => {
    const spy = spyOn(noteService, 'editNote');
    component.note = mockNote;
    component.editNote();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalledWith(mockNote);
    });
  });

  it('should emit value on \'deleteNote\'', fakeAsync(() => {
    const emitSpy = spyOn(component.noteToDelete, 'emit');
    component.deleteNote();
    fixture.detectChanges();
    tick(300);
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('should emit note on \'deleteNote\'', fakeAsync(() => {
    const emitSpy = spyOn(component.noteToDelete, 'emit');
    component.note = mockNote;
    component.deleteNote();
    fixture.detectChanges();
    tick(300);
    expect(emitSpy).toHaveBeenCalledWith(mockNote);
  }));

  it('should navigate to \'add-note\' on editNote()', () => {
    const spy = spyOn(router, 'navigate');
    component.editNote();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(['add-note']);
  });

  it('should change \'areDetailsDisplayed\' on showDetails()', () => {
    component.showDetails();
    expect(component.areDetailsDisplayed).toBe(true);
    component.showDetails();
    expect(component.areDetailsDisplayed).toBe(false);
  });

  it('should change \'expandState\' animation state on showDetails()', () => {
    component.showDetails();
    expect(component.expandState).toBe('expand');
    component.showDetails();
    expect(component.expandState).toBe('collapse');
  });

  it('should have \'description\' class when areDetailsDisplayed is true', () => {
    component.areDetailsDisplayed = true;
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.description'));
      expect(element).toBeTruthy();
      expect(element.nativeElement.innerHTML).toBeTruthy();
    });
  });

  it('should NOT have \'description\' class when areDetailsDisplayed is false', () => {
    component.areDetailsDisplayed = false;
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.description'));
      expect(element).toBeFalsy();
    });
  });

  it('should not have \'expand_more\' mat-icon if note description is undefined', () => {
    component.note = { ...mockNote, description: undefined };
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.expand-button'));
      expect(element).toBeFalsy();
    });
  });

  it('should not have \'expand_more\' mat-icon if description is empty', () => {
    component.note = { ...mockNote, description: '' };
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.expand-button'));
      expect(element).toBeFalsy();
    });
  });

  it('should call \'showDetails\' on \'expand-button\' press', () => {
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const spy = spyOn(component, 'showDetails').and.callThrough();
      const element = fixture.debugElement.query(By.css('.expand-button'));
      element.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should have \'expand_more\' icon if areDetailsDisplayed is true', () => {
    component.areDetailsDisplayed = false;
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.expand-button')).children[0];
      expect(element.nativeElement.innerHTML).toBe('expand_more');
    });
  });

  it('should have \'expand_less\' icon if areDetailsDisplayed is true', () => {
    component.areDetailsDisplayed = true;
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.expand-button')).children[0];
      expect(element.nativeElement.innerHTML).toBe('expand_less');
    });
  });

  it('should have background color of a note', () => {
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const element = fixture.debugElement.query(By.css('.main-data-note'));
      expect(element.nativeElement.style.background).toBe('rgb(0, 0, 0)');
    });
  });

  it('should call \'showDetails\' on \'expand-button\' press', () => {
    component.note = mockNote;
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      const spy = spyOn(component, 'showDetails').and.callThrough();
      const element = fixture.debugElement.query(By.css('.expand-button'));
      element.nativeElement.click();
      expect(spy).toHaveBeenCalled();
    });
  });

});

@Component({
  selector: 'app-mock-cmpt',
  template: '<p>mock</p>',
})
class MockComponent { }

const routes: Routes = [
  { path: 'add-note', component: MockComponent }
];

const mockNote: Note = {
  id: 0,
  title: 'title',
  color: '#000000',
  description: 'desc',
  icon: 'icon',
  date: new Date(2020, 11, 10)
};

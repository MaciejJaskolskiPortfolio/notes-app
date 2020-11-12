import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';
import { TopbarComponent } from '../../common/topbar/topbar.component';
import { ButtonComponent } from '../../forms/button/button.component';
import { InputComponent } from '../../forms/input/input.component';
import { SelectComponent } from '../../forms/select/select.component';
import { TextareaComponent } from '../../forms/textarea/textarea.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoteFormComponent } from './note-form.component';
import { MatDialog } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NgModule } from '@angular/core';
import { IconDialogComponent } from './icon-dialog/icon-dialog.component';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color-dialog/color/color.component';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { Note } from 'src/app/models/note.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { execFile } from 'child_process';

describe('NoteFormComponent', () => {
  let component: NoteFormComponent;
  let fixture: ComponentFixture<NoteFormComponent>;
  let dialog: MatDialog;
  let router: Router;
  let notesService: NotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteFormComponent, TopbarComponent, InputComponent, ButtonComponent, SelectComponent, TextareaComponent],
      imports: [MaterialModule, RouterTestingModule.withRoutes(mockRoutes), FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MockModule],
      providers: [{provide: NotesService, useClass: MockNotesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFormComponent);
    component = fixture.componentInstance;
    dialog = fixture.debugElement.injector.get(MatDialog);
    router = fixture.debugElement.injector.get(Router);
    notesService = fixture.debugElement.injector.get(NotesService);
    fixture.detectChanges();
  });

  afterEach(() => {
    dialog.closeAll();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a IconDialog on openIconDialog()', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.openIconDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should open a ColorDialog on openColorDialog()', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.openColorDialog();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate \'home\' on navigateToHome() ', () => {
    const spy = spyOn(router, 'navigate').and.callThrough()
    component.navigateToHome();
    expect(spy).toHaveBeenCalledWith(['home']);
  });

  it('should navigate \'home\' on createNote() and form is valid ', () => {
    component.noteForm.get('title').setValue('title');
    component.noteForm.get('date').setValue(new Date());
    const spy = spyOn(router, 'navigate').and.callThrough()
    component.createNote();
    expect(spy).toHaveBeenCalledWith(['home']);
  });

  it('should call \'notesService.addNote\' if buttonText is different than \'Edit note\'', () => {
    component.buttonText = 'Create note';
    component.noteForm.get('title').setValue('title');
    component.noteForm.get('date').setValue(new Date());
    const spy = spyOn(notesService, 'addNote').and.callThrough();
    component.createNote();
    expect(spy).toHaveBeenCalled();
  });

  it('should call \'notesService.patchNote\' if buttonText is than \'Edit note\'', () => {
    component.buttonText = 'Edit note';
    component.noteForm.get('title').setValue('title');
    component.noteForm.get('date').setValue(new Date());
    const spy = spyOn(notesService, 'patchNote').and.callThrough();
    component.createNote();
    expect(spy).toHaveBeenCalled();
  });

  it('should create empty form on \'createForm\' when note is empty', () => {
    const form = component.createForm(new Note());
    Object.keys(form.value).forEach(k => {
      expect(form.get(k).value).toBe('');
    });
  });

  it('should create filled form on \'createForm\'', () => {
    const form = component.createForm(mockNote);
    Object.keys(form.value).forEach(k => {
      expect(form.get(k).value).toBe(mockNote[k]);
    });
  });

  it('should change buttonText to \'Edit note\' if note is given', () => {
    notesService.editNote(mockNote);
    expect(component.buttonText).toBe('Edit note');
  });

  it('should change buttonText to \'Create note\' if note is undefined', () => {
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      expect(component.buttonText).toBe('Create note');
    });
  });

  it('should display error when \'title\' is invalid and dirty', () => {
    component.noteForm.get('title').setValue('1');
    component.noteForm.get('title').markAsDirty({ onlySelf: true });
    expect(component.shouldDisplayError('title')).toBe(true);
  });

  it('should display error when \'date\' is invalid and dirty', () => {
    component.noteForm.get('date').setValue(new Date());
    component.noteForm.get('date').markAsDirty({ onlySelf: true });
    expect(component.shouldDisplayError('date')).toBe(false);
  });

  it('should NOT display error when \'title\' is NOT invalid and dirty', () => {
    component.noteForm.get('title').setValue('1234');
    component.noteForm.get('title').markAsDirty({ onlySelf: true });
    expect(component.shouldDisplayError('title')).toBe(false);
  });

  it('should NOT display error when \'date\' is NOT invalid and dirty', () => {
    component.noteForm.get('date').setValue(new Date());
    component.noteForm.get('date').markAsDirty({ onlySelf: true });
    expect(component.shouldDisplayError('date')).toBe(false);
  });

  it('should NOT display error when \'title\' is invalid and NOT dirt', () => {
    component.noteForm.get('title').setValue('1');
    expect(component.shouldDisplayError('title')).toBe(false);
  });

  it('should NOT display error when \'date\' is invalid and NOT dirty', () => {
    component.noteForm.get('date').setValue(null);
    expect(component.shouldDisplayError('date')).toBe(false);
  });
});

@Component({
  selector: 'app-mock-cmpt',
  template: '<p>Mock</p>'
}) class MockComponent {}

@NgModule({
  declarations: [IconDialogComponent, ColorDialogComponent, ColorComponent, MockComponent],
  imports: [ MaterialModule, CommonModule ],
  entryComponents: [IconDialogComponent, ColorDialogComponent ]
}) class MockModule {}

const mockRoutes: Routes = [
  { path: 'home', component: MockComponent }
];

const mockNote: Note = {
  id: 0,
  title: 'title',
  color: '#000000',
  description: 'desc',
  icon: 'icon',
  date: new Date(2020, 11, 10)
};

class MockNotesService {
  private readonly _editedNote = new BehaviorSubject<Note>(new Note());
  editedNote = this._editedNote.asObservable();

  patchNote() { }

  addNote() { }

  editNote(note: Note) {
    this._editedNote.next(note);
  }
}

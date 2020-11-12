import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes-service/notes.service';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
import { IconDialogComponent } from './icon-dialog/icon-dialog.component';
import { Note } from 'src/app/models/note.model';
import * as moment from 'moment';
import { Subscriber, Subscription } from 'rxjs';

const DateFormat = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }
};

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DateFormat},
  ],
})
export class NoteFormComponent implements OnInit, OnDestroy {

  pickedColor: string;
  pickedIcon: string;

  noteForm: FormGroup;

  buttonText = 'Create note';
  id: number;

  private sub: Subscription;

  private readonly dialogProperties = { width: '80%', height: '75%' };

  constructor(private router: Router, public dialog: MatDialog, private fb: FormBuilder,
              private notesService: NotesService) { }

  ngOnInit() {

    this.sub = this.notesService.editedNote.subscribe(n => {
      this.noteForm = this.createForm(n);
      if (n.title != null) {
        this.buttonText = 'Edit note';
        this.id = n.id;
        this.noteForm.get('icon').setValue(n.icon);
        this.noteForm.get('color').setValue(n.color);
        this.pickedColor = n.color;
        this.pickedIcon = n.icon;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createForm(note: Note) {
    return this.fb.group({
      title: [note.title || '', [Validators.required, Validators.minLength(3)]],
      description: [note.description || ''],
      icon: [note.icon || ''],
      color: [note.color || ''],
      date: [note.date || '', [Validators.required]]
    });
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }

  openColorDialog() {
    const dialogRef = this.dialog.open(ColorDialogComponent, this.dialogProperties);

    dialogRef.afterClosed().subscribe(result => {
      this.pickedColor = result;
      this.noteForm.get('color').setValue(result);
    });
  }

  openIconDialog() {
    const dialogRef = this.dialog.open(IconDialogComponent, this.dialogProperties);

    dialogRef.afterClosed().subscribe(result => {
      this.pickedIcon = result;
      this.noteForm.get('icon').setValue(result);
    });
  }

  shouldDisplayError(controlName: string) {
    return this.noteForm.get(controlName).invalid && this.noteForm.get(controlName).dirty;
  }

  createNote() {
    if (!this.noteForm.valid) {
      this.markControlsAsDirty(this.noteForm);
    } else {
      this.editOrCreateNote(this.buttonText);
      this.router.navigate(['home']);
    }
  }

  private markControlsAsDirty(form: FormGroup) {
    Object.keys(form.controls).forEach(c => {
      form.get(c).markAsDirty({ onlySelf: true });
    });
  }

  private editOrCreateNote(btnText: string) {
    btnText === 'Edit note' ?
      this.notesService.patchNote({ ...this.noteForm.getRawValue(), date: this.momentDateToDateObj(this.noteForm.get('date').value), id: this.id }) :
      this.notesService.addNote({ ...this.noteForm.getRawValue(), date: this.momentDateToDateObj(this.noteForm.get('date').value)});
  }

  private momentDateToDateObj(value: any) {
    return moment(value).toDate();
  }
}

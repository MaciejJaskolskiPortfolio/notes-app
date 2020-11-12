import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InputComponent } from './components/forms/input/input.component';
import { MaterialModule } from './modules/material.module';
import { ButtonComponent } from './components/forms/button/button.component';
import { AuthBaseComponent } from './components/auth/auth-base.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreatedAccountComponent } from './components/auth/register/created-account/created-account.component';
import { ConfirmedEmailComponent } from './components/auth/register/confirmed-email/confirmed-email.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditableLabelComponent } from './components/profile/editable-label/editable-label.component';
import { TopbarComponent } from './components/common/topbar/topbar.component';
import { DeleteProfileComponent } from './components/profile/delete-profile/delete-profile.component';
import { NotesHomeComponent } from './components/notes/notes-home.component';
import { CalendarTopbarComponent } from './components/notes/calendar-topbar/calendar-topbar.component';
import { NotesListComponent } from './components/notes/notes-list.component';
import { NoteComponent } from './components/notes/notes-list/note/note.component';
import { CurrentDatePipe } from './pipes/current-date/current-date.pipe';
import { NoteFormComponent } from './components/notes/note-form/note-form.component';
import { TextareaComponent } from './components/forms/textarea/textarea.component';
import { SelectComponent } from './components/forms/select/select.component';
import { ColorDialogComponent } from './components/notes/note-form/color-dialog/color-dialog.component';
import { IconDialogComponent } from './components/notes/note-form/icon-dialog/icon-dialog.component';
import { ColorComponent } from './components/notes/note-form/color-dialog/color/color.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  entryComponents: [
    ColorDialogComponent,
    IconDialogComponent
  ],
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    AuthBaseComponent,
    LoginComponent,
    RegisterComponent,
    CreatedAccountComponent,
    ConfirmedEmailComponent,
    NotFoundComponent,
    HomeComponent,
    ProfileComponent,
    EditableLabelComponent,
    TopbarComponent,
    DeleteProfileComponent,
    NotesHomeComponent,
    CalendarTopbarComponent,
    NotesListComponent,
    NoteComponent,
    CurrentDatePipe,
    ColorDialogComponent,
    IconDialogComponent,
    NoteFormComponent,
    TextareaComponent,
    SelectComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthBaseComponent } from './components/auth/auth-base.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ConfirmedEmailComponent } from './components/auth/register/confirmed-email/confirmed-email.component';
import { CreatedAccountComponent } from './components/auth/register/created-account/created-account.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NoteFormComponent } from './components/notes/note-form/note-form.component';
import { NotesHomeComponent } from './components/notes/notes-home.component';
import { DeleteProfileComponent } from './components/profile/delete-profile/delete-profile.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, data: { animation: 'profile' } },
  { path: 'profile/delete', component: DeleteProfileComponent, data: { animation: 'profile-delete' } },
  { path: 'auth', component: AuthBaseComponent, children: [
    { path: 'login', component: LoginComponent, data: { animation: 'login' } },
    { path: 'register', component: RegisterComponent, data: { animation: 'register' }},
    { path: 'created-account', component: CreatedAccountComponent, data: { animation: 'created-account' } },
    { path: 'confirmed-email', component: ConfirmedEmailComponent }
  ]},
  { path: 'home', component: NotesHomeComponent, data: { animation: 'note-home' }  },
  { path: 'add-note', component: NoteFormComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

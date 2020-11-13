import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { matchValuesValidator } from 'src/app/validators/matchValues.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login-register.styles.scss']
})
export class RegisterComponent implements OnInit {

  registerGroup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registerGroup = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: matchValuesValidator('password', 'confirmPassword')});
  }

  shouldDisplayError(controlName: string) {
    return this.registerGroup.get(controlName).invalid && this.registerGroup.get(controlName).dirty;
  }

  register() {
    if (!this.registerGroup.valid) {
      console.log('invalid form');
      this.markControlsInvalid(this.registerGroup);
    } else {
      console.log('form valid');
    }
  }

  private markControlsInvalid(form: FormGroup) {
    Object.keys(form.controls).forEach(c => {
      form.get(c).markAsDirty({ onlySelf: true });
    });
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

}

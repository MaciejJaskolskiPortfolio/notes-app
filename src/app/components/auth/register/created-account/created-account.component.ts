import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-created-account',
  templateUrl: './created-account.component.html',
  styleUrls: ['./created-account.component.scss']
})
export class CreatedAccountComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

}

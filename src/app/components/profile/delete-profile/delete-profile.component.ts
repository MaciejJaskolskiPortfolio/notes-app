import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

}

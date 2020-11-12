import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from '../../services/profile-service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: any;
  isNavigated = false;

  private sub: Subscription;

  constructor(private router: Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.sub = this.profileService.profile.subscribe(p => this.profile = this.profileService.getMap(p));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  navigateToDeleteProfile() {
    this.router.navigate(['/profile/delete']);
  }

  navigateToNotesPage() {
    this.isNavigated = true;
    this.router.navigate(['/home']);
  }

}

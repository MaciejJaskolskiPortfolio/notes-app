import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition } from '@angular/animations';
import { fadeIn } from '../../animations/transitions.animation';

@Component({
  selector: 'app-auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('* => created-account', fadeIn),
      transition('* => login', fadeIn),
      transition('* => register', fadeIn)
    ])
  ]
})
export class AuthBaseComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkIfCurrentRouteEqual(route: string) {
    return this.router.url === route;
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  prepareRoute(outlet: RouterOutlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation || null;
  }

}

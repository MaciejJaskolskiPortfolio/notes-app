import { transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeIn, slideRightTransparent } from './animations/transitions.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('profile => note-home', slideRightTransparent),
    ])
  ]
})
export class AppComponent {
  title = 'notesapp';

  prepareRoute(outlet: RouterOutlet) {
    const animation = outlet.activatedRouteData['animation'] || {};
    return animation || null;
  }
}

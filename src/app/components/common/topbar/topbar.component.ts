import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() showBackButton = true;

  @Output() navigationBackPressed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  navigateBackPressed() {
    this.navigationBackPressed.emit(true);
  }
}

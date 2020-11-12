import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['../form-style.style.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText = 'button';
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['../form-style.style.scss']
})
export class InputComponent implements OnInit {

  @Input() backgroundColor: string;
  @Input() icon: string = 'clear';
  @Input() type = 'text';
  @Input() width: string;
  @Input() value = '';

  constructor() { }

  ngOnInit() {
  }

}

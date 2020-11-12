import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['../form-style.style.scss']
})
export class TextareaComponent implements OnInit {

  @Input() backgroundColor: string;
  @Input() icon: string = 'clear';
  @Input() type = 'text';
  @Input() width: string;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}

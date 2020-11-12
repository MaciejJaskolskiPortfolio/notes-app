import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['../form-style.style.scss']
})
export class SelectComponent implements OnInit {

  @Input() backgroundColor: string;
  @Input() icon = 'clear';
  @Input() width: string;
  @Input() text: string;
  @Input() value: string = '';

  @Output() optionPressed = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {  }

}

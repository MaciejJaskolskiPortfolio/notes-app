import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../../services/profile-service/profile.service';

@Component({
  selector: 'app-editable-label',
  templateUrl: './editable-label.component.html',
  styleUrls: ['./editable-label.component.scss']
})
export class EditableLabelComponent implements OnInit {

  label = 'defaultLabel';
  input: string;
  passwordInput: string;

  @Input() labelKey = 'label';
  @Input() labelValue = 'value';
  @Input() isValueHidden = false;

  @Output() changedLabelValue = new EventEmitter<any>();

  isEditionModeActive = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    const l = this.labelKey.match(/[A-z]+/g);
    this.label = l[1] ? l[0] + ' ' + l[1] : l[0];
    this.input = this.labelValue;
    this.passwordInput = this.labelValue;
  }

  switchEditionMode() {
    this.isEditionModeActive = !this.isEditionModeActive;
  }

  confirmEdit() {
    this.isEditionModeActive = !this.isEditionModeActive;
    this.profileService.editData( this.labelKey, this.input || this.passwordInput );
    this.changedLabelValue.emit(this.labelValue);
  }
}

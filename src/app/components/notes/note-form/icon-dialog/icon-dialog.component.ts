import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Icons } from 'src/app/data/icons.data';

@Component({
  selector: 'app-icon-dialog',
  templateUrl: './icon-dialog.component.html',
  styleUrls: ['./icon-dialog.component.scss']
})
export class IconDialogComponent implements OnInit {

  readonly icons: string[] = Icons;

  constructor(private dialogRef: MatDialogRef<IconDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  pickIcon(icon: string) {
    this.dialogRef.close(icon);
  }

}

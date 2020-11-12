import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Colors } from 'src/app/data/colors.data';

@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss']
})
export class ColorDialogComponent implements OnInit {

  colorList: string[] = Colors;

  constructor(private dialogRef: MatDialogRef<ColorDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  pickColor(color: string) {
    this.dialogRef.close(color);
  }

}

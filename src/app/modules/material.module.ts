import { NgModule } from '@angular/core';

import { MatIconModule, MatDialogModule, MatDatepickerModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTooltipModule
  ],
  exports: [
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }

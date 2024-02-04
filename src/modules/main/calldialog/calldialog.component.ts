import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICalls } from 'src/modules/shared/interfaces/ICalls';

@Component({
  selector: 'app-calldialog',
  templateUrl: './calldialog.component.html',
  styleUrls: ['./calldialog.component.css'],
})
export class CalldialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CalldialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; call: ICalls }
  ) {
    console.log('Data in CalldialogComponent:', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.call);

    this.dialogRef.close(this.data.call);
  }
}

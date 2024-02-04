import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IClient } from 'src/modules/shared/interfaces/IClient';

@Component({
  selector: 'app-clientdialog',
  templateUrl: './clientdialog.component.html',
  styleUrls: ['./clientdialog.component.css'],
})
export class ClientdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ClientdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; client: IClient }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.client);
    this.dialogRef.close(this.data.client);
  }
}

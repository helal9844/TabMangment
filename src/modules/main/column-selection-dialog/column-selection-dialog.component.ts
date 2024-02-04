import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IClient } from 'src/modules/shared/interfaces/IClient';
@Component({
  selector: 'app-column-selection-dialog',
  templateUrl: './column-selection-dialog.component.html',
  styleUrls: ['./column-selection-dialog.component.css'],
})
export class ColumnSelectionDialogComponent {
  columns: string[] = [];
  allColumns: string[] = [
    'id',
    'clientName',
    'clientJob',
    'salesManId',
    'address',
    'phoneNumber',
    'mobile',
    'whatsApp',
    'email',
    'code',
    'nationality',
    'residence',
    'enterBy',
    'enterDate',
    'lastUpdateBy',
    'lastUpdateDate',
  ];
  constructor(
    public dialogRef: MatDialogRef<ColumnSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { columns: string[] }
  ) {
    this.columns = data.columns.slice();
  }

  toggleColumn(column: string) {
    const index = this.data.columns.indexOf(column);
    if (index !== -1) {
      this.data.columns.splice(index, 1);
    } else {
      this.data.columns.push(column);
    }
  }
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  isColumnSelected(column: string): boolean {
    return this.data.columns.includes(column);
  }
}

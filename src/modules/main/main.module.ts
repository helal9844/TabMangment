import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { MainContentComponent } from './main-content/main-content.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ClientdialogComponent } from './clientdialog/clientdialog.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ColumnSelectionDialogComponent } from './column-selection-dialog/column-selection-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { CallsComponent } from './calls/calls.component';
import { CalldialogComponent } from './calldialog/calldialog.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    ClientdialogComponent,
    ConfirmationDialogComponent,
    ColumnSelectionDialogComponent,
    CallsComponent,
    CalldialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainContentComponent,
    CallsComponent,
  ],
})
export class MainModule {}

import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { CallsService } from 'src/modules/shared/services/calls.service';
import { ICalls } from 'src/modules/shared/interfaces/ICalls';
import { IClient } from 'src/modules/shared/interfaces/IClient';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import { ClientService } from 'src/modules/shared/services/client.service';
import { IEmployee } from 'src/modules/shared/interfaces/IEmployee';
import { EmployeeService } from 'src/modules/shared/services/employee.service';
import { ExportService } from 'src/modules/shared/services/export.service';
import { ClientdialogComponent } from '../clientdialog/clientdialog.component';
import { ColumnSelectionDialogComponent } from '../column-selection-dialog/column-selection-dialog.component';
import { CalldialogComponent } from '../calldialog/calldialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'],
})
export class CallsComponent implements OnInit {
  AllCalls: ICalls[] = [];

  searchValue: string = '';
  checkSearch: boolean = false;

  displayedColumns: string[] = [
    'id',
    'description',
    'date',
    'project',
    'callType',
    'clientId',
    'employeeId',
    'enterBy',
    'enterDate',
    'lastUpdateBy',
    'lastUpdateDate',
    'actions',
  ];
  dataSource: MatTableDataSource<ICalls> = new MatTableDataSource<ICalls>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private callsService: CallsService,
    private exportService: ExportService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllCalls();
  }
  getAllCalls() {
    this.callsService.getAllCalls().subscribe((date: any) => {
      this.AllCalls = date;
      this.dataSource.data = this.AllCalls;
      this.dataSource.paginator = this.paginator;
      console.log(this.AllCalls);
    });
  }
  printTable() {
    this.exportService.printTable('printable-table', 'Call Table');
  }
  exportToExcel() {
    this.exportService.exportToExcel('printable-table', 'call_data.xlsx');
  }
  RefreshTable() {
    setTimeout(() => {
      this.getAllCalls();
    }, 100);
  }

  addCall() {
    const dialogRef = this.dialog.open(CalldialogComponent, {
      width: '400px',
      data: { action: 'Add', call: {} as ICalls },
    });

    dialogRef.afterClosed().subscribe((result: ICalls | undefined) => {
      if (result) {
        result.enterBy = '1';
        result.enterDate = new Date();
        result.lastUpdateBy = '1';
        result.lastUpdateDate = new Date();

        this.callsService.addCall(result).subscribe(() => {
          console.log(result);
          this.RefreshTable();
        });
      }
    });
  }
  editCall(call: ICalls) {
    const dialogRef = this.dialog.open(CalldialogComponent, {
      width: '400px',
      data: { action: 'Edit', call: { ...call } }, // Pass a copy of the client object
    });

    dialogRef.afterClosed().subscribe((result: ICalls | undefined) => {
      if (result) {
        result.lastUpdateBy = '1';
        result.lastUpdateDate = new Date();

        this.callsService.updateCall(result).subscribe(() => {
          this.RefreshTable();
        });
      }
    });
  }
  deleteCall(call: ICalls) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete this client?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.callsService.deleteCall(call).subscribe(() => {
          this.RefreshTable();
        });
      }
    });
  }
  applyFilter(event: Event, columnName: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: ICalls, filter: string) => {
      const value = data[columnName as keyof ICalls];
      return value ? value.toString().toLowerCase().includes(filter) : false;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openColumnSelectionDialog() {
    const dialogRef = this.dialog.open(ColumnSelectionDialogComponent, {
      width: '400px',
      data: { columns: this.displayedColumns },
    });

    dialogRef
      .afterClosed()
      .subscribe((selectedColumns: string[] | undefined) => {
        if (selectedColumns) {
          console.log(selectedColumns);
          this.displayedColumns = selectedColumns;
          this.addDynamicColumn('actions');
        }
      });
  }
  addDynamicColumn(column: string) {
    const actionsColumnIndex = this.displayedColumns.indexOf('actions');
    if (actionsColumnIndex !== -1) {
      this.displayedColumns.splice(actionsColumnIndex, 1);
    }

    this.displayedColumns.push(column);

    this.displayedColumns.push('actions');
  }
}

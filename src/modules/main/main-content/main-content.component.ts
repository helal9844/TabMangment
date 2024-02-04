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
import { ClientdialogComponent } from '../clientdialog/clientdialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ColumnSelectionDialogComponent } from '../column-selection-dialog/column-selection-dialog.component';
import { ExportService } from 'src/modules/shared/services/export.service';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements OnInit {
  AllCalls: ICalls[] = [];
  AllClients: IClient[] = [];
  AllEmployees: IEmployee[] = [];
  searchValue: string = '';
  checkSearch: boolean = false;
  /////////////////
  displayedColumns: string[] = [
    'id',
    'clientName',
    'clientJob',
    'address',
    'phoneNumber',
    'enterBy',
    'enterDate',
    'actions',
  ];
  dataSource: MatTableDataSource<IClient> = new MatTableDataSource<IClient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private callsService: CallsService,
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private exportService: ExportService
  ) {}
  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((data: any) => {
      this.AllClients = data;
      this.dataSource.data = this.AllClients;
      this.dataSource.paginator = this.paginator;
      console.log(this.AllClients);
    });
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientdialogComponent, {
      width: '400px',
      data: { action: 'Add', client: {} as IClient },
    });

    dialogRef.afterClosed().subscribe((result: IClient | undefined) => {
      if (result) {
        result.enterBy = '1';
        result.enterDate = new Date();
        result.lastUpdateBy = '1';
        result.lastUpdateDate = new Date();
        console.log(result);
        this.clientService.addClient(result).subscribe(() => {
          console.log(result);
          this.RefreshTable();
        });
      }
    });
  }
  editClient(client: IClient) {
    const dialogRef = this.dialog.open(ClientdialogComponent, {
      width: '400px',
      data: { action: 'Edit', client: { ...client } }, // Pass a copy of the client object
    });

    dialogRef.afterClosed().subscribe((result: IClient | undefined) => {
      if (result) {
        // Update the client properties
        result.lastUpdateBy = '1';
        result.lastUpdateDate = new Date();

        // Call the client service to update the client
        this.clientService.updateClient(result).subscribe(() => {
          this.RefreshTable();
        });
      }
    });
  }
  deleteClient(client: IClient) {
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
        this.clientService.deleteClient(client).subscribe(() => {
          this.RefreshTable();
        });
      }
    });
  }
  RefreshTable() {
    console.log('clicked');
    setTimeout(() => {
      this.getAllClients();
      this.dataSource;
    }, 100);
  }
  printTable() {
    this.exportService.printTable('printable-table', 'Client Table');
  }
  exportToExcel() {
    this.exportService.exportToExcel('printable-table', 'client_data.xlsx');
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
  applyFilter(event: Event, columnName: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: IClient, filter: string) => {
      const value = data[columnName as keyof IClient];
      return value ? value.toString().toLowerCase().includes(filter) : false;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

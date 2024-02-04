import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { IEmployee } from '../interfaces/IEmployee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = env.baseUrl;
  constructor(private http: HttpClient) {}
  getAllEmployees() {
    return this.http.get(`${this.baseUrl}Employee`);
  }
  getEmployeeById(id: number) {
    return this.http.get(`${this.baseUrl}Employee/GetEmployee?id=${id}`);
  }
  updateEmployee(Employee: IEmployee) {
    return this.http.put(`${this.baseUrl}Employee/UpdateEmployee`, Employee);
  }
  addEmployee(Employee: IEmployee) {
    return this.http.post(`${this.baseUrl}Employee/AddEmployee`, Employee);
  }
  deleteEmployee(Employee: IEmployee) {
    return this.http.delete(`${this.baseUrl}Employee/Delete`, {
      body: Employee,
    });
  }
}

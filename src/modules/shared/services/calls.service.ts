import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { ICalls } from '../interfaces/ICalls';
@Injectable({
  providedIn: 'root',
})
export class CallsService {
  baseUrl = env.baseUrl;
  constructor(private http: HttpClient) {}
  getAllCalls() {
    return this.http.get(`${this.baseUrl}calls`);
  }
  getCallById(id: number) {
    return this.http.get(`${this.baseUrl}Calls/GetCall?id=${id}`);
  }
  updateCall(client: ICalls) {
    return this.http.put(`${this.baseUrl}Calls/Updatecall`, client);
  }
  addCall(client: ICalls) {
    return this.http.post(`${this.baseUrl}Calls/AddCalls`, client);
  }
  deleteCall(client: ICalls) {
    return this.http.delete(`${this.baseUrl}Calls/Delete`, { body: client });
  }
  getCallClientEmployee() {
    return this.http.get(`${this.baseUrl}Calls/GetCallClientEmployee`);
  }
}

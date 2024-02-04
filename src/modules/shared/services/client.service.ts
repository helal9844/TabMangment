import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { IClient } from '../interfaces/IClient';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = env.baseUrl;
  constructor(private http: HttpClient) {}
  getAllClients() {
    return this.http.get(`${this.baseUrl}Client`);
  }
  getClientById(id: number) {
    return this.http.get(`${this.baseUrl}Client/GetClinet?id=${id}`);
  }
  updateClient(client: IClient) {
    return this.http.put(`${this.baseUrl}Client/UpdateClient`, client);
  }
  addClient(client: IClient) {
    return this.http.post(`${this.baseUrl}Client/AddClient`, client);
  }
  deleteClient(client: IClient) {
    return this.http.delete(`${this.baseUrl}Client/Delete`, { body: client });
  }
  getClientwithEmployee() {
    return this.http.get(`${this.baseUrl}Client/GetClinetwithEmployee`);
  }
}

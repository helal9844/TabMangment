import { IClient } from './IClient';
import { IEmployee } from './IEmployee';

export interface ICallClientWithEmployee {
  id: number;
  description: string;
  date: string;
  project: string;
  callType: string;
  enterBy: string;
  enterDate: string;
  lastUpdateBy: string;
  lastUpdateDate: string;
  employeeId: number;
  clientId: number;
  employee: IEmployee;
  client: IClient;
}

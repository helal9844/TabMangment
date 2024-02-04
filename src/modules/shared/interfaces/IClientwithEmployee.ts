import { IEmployee } from './IEmployee';

export interface IClientwithEmployee {
  id: number;
  clientName: string;
  clientJob: string;
  salesManId: number;
  salesMan: IEmployee;
  address: string;
  phoneNumber: string;
  mobile: string;
  whatsApp: string;
  email: string;
  code: string;
  nationality: string;
  residence: string;
  enterBy: string;
  enterDate: Date;
  lastUpdateBy: string;
  lastUpdateDate: Date;
}

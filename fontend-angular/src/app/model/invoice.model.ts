import { Customer } from './customer.model';

export class Invoice {
  id: number;
  dateTimeCreate: string;
  dateTimeIn: string;
  intoMoney: number;
  discount: number;
  surcharge: number;
  totalMoney: number;
  customer: Customer;
}

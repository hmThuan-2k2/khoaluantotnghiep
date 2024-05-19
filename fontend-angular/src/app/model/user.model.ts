
import { Employee } from "./employee.model";
import { Roles } from "./roles.model";

export class User {
  id: number;
  username: string;
  employee: Employee;
  roles: Array<Roles>;
}

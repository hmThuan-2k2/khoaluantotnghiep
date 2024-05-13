export class Employee {
  id: number;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  idCard: string;
  constructor(
    id: number,
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phoneNumber: string,
    idCard: string
  ) {
    this.id = id;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.idCard = idCard;
  }
}

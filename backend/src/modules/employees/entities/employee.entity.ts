export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  managerId: string;
  hireDate: Date;
  salary: number;
  status: string;
  photoUrl: string;
  address: any;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

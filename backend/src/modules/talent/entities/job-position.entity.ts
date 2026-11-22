export interface JobPosition {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  salaryRangeMin: number;
  salaryRangeMax: number;
  requirements: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

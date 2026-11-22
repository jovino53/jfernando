export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: any[];
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

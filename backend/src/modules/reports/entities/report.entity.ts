export interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  parameters: Record<string, any>;
  result: any;
  generatedById: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

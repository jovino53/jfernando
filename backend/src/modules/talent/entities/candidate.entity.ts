export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  notes: string;
  positionId: string;
  status: string;
  skills: string[];
  aiScore: number;
  createdAt: Date;
  updatedAt: Date;
}

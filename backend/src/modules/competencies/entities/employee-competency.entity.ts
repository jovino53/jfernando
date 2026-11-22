export interface EmployeeCompetency {
  id: string;
  employeeId: string;
  competencyId: string;
  level: number;
  yearsExperience: number;
  aiAssessment: string;
  aiScore: number;
  createdAt: Date;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  employeeId: string;
  answers: Record<string, any>;
  overallScore: number;
  isAnonymous: boolean;
  createdAt: Date;
}

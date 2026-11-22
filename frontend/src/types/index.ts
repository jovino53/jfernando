export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
  managerId?: string;
  hireDate?: Date;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  photoUrl?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Competency {
  id: string;
  name: string;
  description?: string;
  category: 'technical' | 'behavioral' | 'leadership' | 'digital' | 'language';
  isActive: boolean;
}

export interface EmployeeCompetency {
  id: string;
  employeeId: string;
  competencyId: string;
  level: number;
  yearsExperience: number;
  aiAssessment?: string;
  aiScore?: number;
  competency?: Competency;
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: any[];
  status: 'draft' | 'active' | 'closed';
  startDate?: Date;
  endDate?: Date;
  responses?: SurveyResponse[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  employeeId?: string;
  answers: Record<string, any>;
  overallScore?: number;
  isAnonymous: boolean;
}

export interface Report {
  id: string;
  title: string;
  description?: string;
  type: 'headcount' | 'turnover' | 'compensation' | 'performance' | 'absenteeism' | 'diversity' | 'custom';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  parameters?: any;
  result?: any;
  fileUrl?: string;
  createdAt: Date;
}

export interface JobPosition {
  id: string;
  title: string;
  description?: string;
  department: string;
  location?: string;
  salaryRangeMin?: number;
  salaryRangeMax?: number;
  requirements?: string[];
  status: 'open' | 'filled' | 'closed';
  candidates?: Candidate[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  notes?: string;
  positionId: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  skills?: string[];
  aiScore?: number;
  position?: JobPosition;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: 'policies' | 'procedures' | 'benefits' | 'onboarding' | 'training' | 'faq';
  tags?: string[];
  isPublished: boolean;
  views: number;
  authorId?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr_manager' | 'hr_analyst' | 'manager' | 'employee';
  isActive: boolean;
}

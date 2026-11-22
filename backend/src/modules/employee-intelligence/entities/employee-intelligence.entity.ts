export class EmployeeIntelligenceProfile {
  id: string;
  employeeId: string;
  professionalSummary: string;
  competencyMap: CompetencyMap;
  strengths: string[];
  improvementAreas: string[];
  leadershipPotential: number;
  developmentPlan: DevelopmentPlan;
  riskScore: number;
  retentionRisk: string;
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class CompetencyMap {
  technical: SkillAssessment[];
  behavioral: SkillAssessment[];
  leadership: SkillAssessment[];
}

export class SkillAssessment {
  skill: string;
  level: number;
  trend: 'improving' | 'stable' | 'declining';
}

export class DevelopmentPlan {
  shortTermGoals: Goal[];
  longTermGoals: Goal[];
  recommendedTrainings: string[];
  mentorshipSuggestions: string[];
}

export class Goal {
  title: string;
  description: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
}

export class GenerateProfileDto {
  employeeId: string;
  includeHistorical?: boolean;
}

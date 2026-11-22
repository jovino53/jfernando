import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class ClimateService {
  constructor(private prisma: PrismaService) {}

  async createSurvey(dto: CreateSurveyDto) {
    return this.prisma.survey.create({
      data: {
        title: dto.title,
        description: dto.description,
        questions: dto.questions || [],
        status: 'DRAFT',
      },
    });
  }

  async findAllSurveys() {
    return this.prisma.survey.findMany({
      include: { responses: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneSurvey(id: string) {
    return this.prisma.survey.findUnique({
      where: { id },
      include: { responses: true },
    });
  }

  async submitResponse(
    surveyId: string,
    answers: Record<string, any>,
    employeeId?: string,
  ) {
    return this.prisma.surveyResponse.create({
      data: {
        surveyId,
        employeeId,
        answers,
        overallScore: this.calculateScore(answers),
      },
    });
  }

  async getSurveyResults(surveyId: string) {
    const responses = await this.prisma.surveyResponse.findMany({
      where: { surveyId },
    });

    const totalResponses = responses.length;
    const averageScore =
      responses.reduce((acc: number, r: any) => acc + (Number(r.overallScore) || 0), 0) /
      totalResponses;

    const questionAverages: Record<string, { sum: number; count: number }> = {};
    responses.forEach((r: any) => {
      Object.entries(r.answers).forEach(([key, value]) => {
        if (!questionAverages[key]) {
          questionAverages[key] = { sum: 0, count: 0 };
        }
        questionAverages[key].sum += Number(value) || 0;
        questionAverages[key].count += 1;
      });
    });

    const averages: Record<string, number> = {};
    Object.entries(questionAverages).forEach(([key, val]) => {
      averages[key] = val.sum / val.count;
    });

    return {
      surveyId,
      totalResponses,
      averageScore,
      questionAverages: averages,
      satisfactionIndex: (averageScore / 5) * 100,
    };
  }

  private calculateScore(answers: Record<string, any>): number {
    const values = Object.values(answers).map(Number).filter((v) => !isNaN(v));
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }
}

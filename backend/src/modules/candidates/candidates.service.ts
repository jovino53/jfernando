import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCandidateDto) {
    return this.prisma.candidate.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        cpf: dto.cpf,
        linkedin: dto.linkedin,
        portfolio: dto.portfolio,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        coverLetter: dto.coverLetter,
        experienceYears: dto.experienceYears,
        educationLevel: dto.educationLevel,
        expectedSalary: dto.expectedSalary,
        availability: dto.availability,
        source: dto.source || 'manual',
        tags: dto.tags || [],
        companyId: dto.companyId,
        jobPositionId: dto.jobPositionId,
        status: 'APPLIED',
      },
      include: {
        jobPosition: true,
        skills: { include: { skill: true } },
      },
    });
  }

  async findAll(companyId: string, query?: {
    search?: string;
    status?: string;
    jobPositionId?: string;
    experienceLevel?: string;
  }) {
    const where: any = { companyId };

    if (query?.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query?.status && query.status !== 'all') {
      where.status = query.status;
    }
    if (query?.jobPositionId && query.jobPositionId !== 'all') {
      where.jobPositionId = query.jobPositionId;
    }

    return this.prisma.candidate.findMany({
      where,
      include: {
        jobPosition: true,
        skills: { include: { skill: true } },
        interviews: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.candidate.findUnique({
      where: { id },
      include: {
        jobPosition: true,
        skills: { include: { skill: true } },
        interviews: true,
        company: true,
      },
    });
  }

  async update(id: string, dto: UpdateCandidateDto) {
    return this.prisma.candidate.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
      include: {
        jobPosition: true,
        skills: { include: { skill: true } },
      },
    });
  }

  async updateStatus(id: string, status: string, notes?: string) {
    return this.prisma.candidate.update({
      where: { id },
      data: {
        status: status as any,
        notes: notes || undefined,
        updatedAt: new Date(),
      },
    });
  }

  async updateRating(id: string, rating: number) {
    return this.prisma.candidate.update({
      where: { id },
      data: { rating, updatedAt: new Date() },
    });
  }

  async remove(id: string) {
    return this.prisma.candidate.delete({ where: { id } });
  }

  async getStats(companyId: string) {
    const candidates = await this.prisma.candidate.findMany({
      where: { companyId },
      include: { jobPosition: true },
    });

    const total = candidates.length;
    const byStatus = {
      APPLIED: candidates.filter(c => c.status === 'APPLIED').length,
      SCREENING: candidates.filter(c => c.status === 'SCREENING').length,
      INTERVIEW: candidates.filter(c => c.status === 'INTERVIEW').length,
      TECHNICAL_TEST: candidates.filter(c => c.status === 'TECHNICAL_TEST').length,
      PROPOSAL: candidates.filter(c => c.status === 'PROPOSAL').length,
      OFFER: candidates.filter(c => c.status === 'OFFER').length,
      HIRED: candidates.filter(c => c.status === 'HIRED').length,
      REJECTED: candidates.filter(c => c.status === 'REJECTED').length,
      WITHDRAWN: candidates.filter(c => c.status === 'WITHDRAWN').length,
    };

    const byPosition: Record<string, number> = {};
    candidates.forEach(c => {
      const title = c.jobPosition?.title || 'Sem vaga';
      byPosition[title] = (byPosition[title] || 0) + 1;
    });

    const bySource: Record<string, number> = {};
    candidates.forEach(c => {
      const src = c.source || 'outro';
      bySource[src] = (bySource[src] || 0) + 1;
    });

    return { total, byStatus, byPosition, bySource };
  }

  async scheduleInterview(candidateId: string, data: {
    title: string;
    scheduledAt: string;
    duration?: number;
    type?: string;
    interviewer?: string;
  }) {
    return this.prisma.candidateInterview.create({
      data: {
        title: data.title,
        scheduledAt: new Date(data.scheduledAt),
        duration: data.duration || 60,
        type: (data.type as any) || 'VIDEO',
        interviewer: data.interviewer,
        candidateId,
        status: 'SCHEDULED',
      },
    });
  }

  async getInterviews(candidateId: string) {
    return this.prisma.candidateInterview.findMany({
      where: { candidateId },
      orderBy: { scheduledAt: 'desc' },
    });
  }

  async publicApply(dto: CreateCandidateDto) {
    return this.prisma.candidate.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        linkedin: dto.linkedin,
        portfolio: dto.portfolio,
        coverLetter: dto.coverLetter,
        experienceYears: dto.experienceYears,
        educationLevel: dto.educationLevel,
        expectedSalary: dto.expectedSalary,
        availability: dto.availability,
        source: dto.source || 'portal',
        companyId: dto.companyId,
        jobPositionId: dto.jobPositionId,
        status: 'APPLIED',
      },
      include: { jobPosition: true },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobPositionDto } from './dto/create-job-position.dto';
import { CreateCandidateDto } from './dto/create-candidate.dto';

@Injectable()
export class TalentService {
  constructor(private prisma: PrismaService) {}

  async createPosition(dto: CreateJobPositionDto) {
    return this.prisma.jobPosition.create({
      data: {
        title: dto.title,
        description: dto.description,
        department: dto.department,
        location: dto.location,
        salaryRangeMin: dto.salaryRangeMin,
        salaryRangeMax: dto.salaryRangeMax,
        requirements: dto.requirements || [],
      },
    });
  }

  async findAllPositions() {
    return this.prisma.jobPosition.findMany({
      include: { candidates: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOnePosition(id: string) {
    return this.prisma.jobPosition.findUnique({
      where: { id },
      include: { candidates: true },
    });
  }

  async createCandidate(dto: CreateCandidateDto) {
    return this.prisma.candidate.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        positionId: dto.positionId,
        skills: dto.skills || [],
      },
    });
  }

  async findAllCandidates() {
    return this.prisma.candidate.findMany({
      include: { jobPosition: true },
    });
  }

  async updateCandidateStatus(id: string, status: string) {
    return this.prisma.candidate.update({
      where: { id },
      data: { status },
    });
  }

  async getCandidatesByPosition(positionId: string) {
    return this.prisma.candidate.findMany({
      where: { positionId },
      include: { jobPosition: true },
    });
  }

  async getTalentPipeline() {
    const positions = await this.prisma.jobPosition.findMany({
      where: { status: 'OPEN' },
    });

    const pipeline = await Promise.all(
      positions.map(async (position: any) => {
        const candidates = await this.prisma.candidate.findMany({
          where: { positionId: position.id },
        });

        return {
          position,
          candidates: {
            total: candidates.length,
            byStatus: {
              new: candidates.filter((c: any) => c.status === 'NEW').length,
              screening: candidates.filter((c: any) => c.status === 'SCREENING').length,
              interview: candidates.filter((c: any) => c.status === 'INTERVIEW').length,
              offer: candidates.filter((c: any) => c.status === 'OFFER').length,
            },
          },
        };
      }),
    );

    return pipeline;
  }
}

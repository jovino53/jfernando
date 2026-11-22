import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        name: createEmployeeDto.name,
        email: createEmployeeDto.email,
        phone: createEmployeeDto.phone,
        position: createEmployeeDto.position,
        department: createEmployeeDto.department,
        status: createEmployeeDto.status || 'ACTIVE',
      },
    });
  }

  async findAll() {
    return this.prisma.employee.findMany();
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Colaborador com ID ${id} não encontrado`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id);
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto as any,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.employee.delete({ where: { id } });
  }

  async findByDepartment(department: string) {
    return this.prisma.employee.findMany({
      where: { department },
    });
  }

  async findByManager(managerId: string) {
    return this.prisma.employee.findMany({
      where: { managerId },
    });
  }

  async getStats() {
    const total = await this.prisma.employee.count();
    const active = await this.prisma.employee.count({
      where: { status: 'ACTIVE' },
    });
    const departments = await this.prisma.employee.groupBy({
      by: ['department'],
      _count: { id: true },
    });

    return { total, active, departments };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
    });
  }
}

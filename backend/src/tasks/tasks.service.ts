import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string): Promise<{ message: string }> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: `Task with ID ${id} has been successfully deleted` };
  }

  async getTasksByUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.task.findMany({
      where: { assignedToId: userId },
    });
  }

    async getTasksByProject(projectId: string) {
        const project = await this.prisma.project.findUnique({
        where: { id: projectId },
        });

        if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
        }

        return this.prisma.task.findMany({
        where: { projectId },
        });
    }
}

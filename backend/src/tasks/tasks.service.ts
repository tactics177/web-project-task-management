import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(
    //data: Prisma.TaskCreateInput
    data: CreateTaskDto
  ) {

    console.log(`data in create prisma task: ${data}`)

    const { assignedTo, ...taskDetails } = data;

    taskDetails.priority = Number(taskDetails.priority)

    const user = await this.prisma.user.findFirst({
      where: {
          email: assignedTo.email,
          name: assignedTo.name,
        },
    });
    if (!user) {
      throw new Error('User with the specified email and name does not exist.');
    }

    return this.prisma.task.create({
      data: {
        ...taskDetails,
        assignedToId: user.id, // Use the user's ID directly for the relation
      },
    });
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
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
}

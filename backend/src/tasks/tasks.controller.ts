import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('user/:userId')
  async getTasksByUser(@Param('userId') userId: string) {
    return this.tasksService.getTasksByUser(userId);
  }
}

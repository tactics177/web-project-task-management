import { IsString, IsOptional, IsInt, IsArray, IsDateString, IsEnum, IsEmail } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class userForTask {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  priority: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  assignedTo?: userForTask;

  @IsOptional()
  @IsString()
  parentId?: string;
}



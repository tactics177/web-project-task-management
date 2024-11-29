import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('usersForTask')
  @HttpCode(200)
  async getTasksByUser() {
    return this.usersService.getAllUsers();
  }
}

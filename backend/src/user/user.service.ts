import { Get, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async create(dto:AuthDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password),
    }
    return this.prisma.user.create({data:user})
  }

  async getByEmail(email:string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }
}

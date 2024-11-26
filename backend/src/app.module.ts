import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import {PrismaService} from "./prisma/prisma.service";

@Module({
  imports: [PrismaModule, UsersModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

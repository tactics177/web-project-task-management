import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from './dto/create-project.dto';
import {UpdateProjectDto} from './dto/update-project.dto';
import {PrismaService} from "../prisma/prisma.service";


@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {
    }

    async create(createProjectDto: CreateProjectDto) {
        return this.prisma.project.create({
            data:  createProjectDto,
        });
    }

    findAll() {
        return this.prisma.project.findMany();
    }

    async findOne(id: string) {
        return this.prisma.project.findUnique({
            where: { id },
        });
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        return this.prisma.project.update({
            where: { id },
            data: updateProjectDto,
        });
    }

    async remove(id: string) {
        return this.prisma.project.delete({
            where: { id },
        });
    }
}

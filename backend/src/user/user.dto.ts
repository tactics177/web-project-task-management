import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email?: string

    @IsOptional()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    @IsString()
    password: string

    @IsString()
    name: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}


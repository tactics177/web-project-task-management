import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { verify } from 'argon2';


@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private userService: UserService
    ) {}

    async register(dto:AuthDto) {

        const oldUser = await this.userService.getByEmail(dto.email)
        if (oldUser) { throw new BadRequestException("User already exists!")}
        const {password, ...user} = await this.userService.create(dto);
        //const token = this.issueTokens(user.id)

        //return {user, ...token}
        return {user}
    }

    async login(dto: LoginDto) {
        const {password, ...user} = await this.validateUser(dto)
        const tokens = this.issueTokens(user.id )
        return {user, ...tokens}
    }

    private issueTokens(userId: string) {
        const data = {id:userId}
        const accessToken = this.jwt.sign(data, {expiresIn: '7d'})

        return { accessToken}
    }

    private async validateUser(dto:LoginDto) {
        const user = await this.userService.getByEmail(dto.email)

        if (!user) { throw new NotFoundException("User not found!")}

        const isValid = await verify(user.password, dto.password)

        if (!isValid) { throw new UnauthorizedException('Invalid password')}

        return user
    }
}

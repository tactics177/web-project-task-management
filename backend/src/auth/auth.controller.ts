import { Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { Auth } from './decorators/auth.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register') 
  async register(@Body() dto:AuthDto, @Res({passthrough: true}) res: Response) {
    const {...response} = await this.authService.register(dto)
    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto:LoginDto, @Res({passthrough: true }) res: Response) {
    const {...response} = await this.authService.login(dto)
    return response
  }

  @HttpCode(200)
  @Post('logout')
  @Auth()
  async logout( @Res({passthrough: true}) res: Response) {
    return true
  }
}

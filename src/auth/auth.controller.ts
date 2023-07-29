import { Controller } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('local')
  async local(@Req() req: any) {
    return this.authService.login(req.user);
  }
}

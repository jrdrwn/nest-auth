import { Controller, Get, Post, NotFoundException, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/shared/global/is-public';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    throw new NotFoundException();
  }

  @Public()
  @Post()
  async createUser(@Body() user: any): Promise<any> {
    user.password = await this.usersService.hashPassword(user.password);
    await this.usersService.create(user);
    return user;
  }
}

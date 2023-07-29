import { Injectable } from '@nestjs/common';
import { User, UserDoc } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}
  async create(user: User): Promise<UserDoc> {
    return this.userModel.create(user);
  }

  async findOne(username: string): Promise<UserDoc> {
    return this.userModel.findOne({ username });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.configService.get<number>('saltRounds'));
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

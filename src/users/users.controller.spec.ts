import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [ConfigModule],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw NotFoundException', () => {
    expect(() => {
      controller.getUsers();
    }).toThrow('Not Found');
  });
});

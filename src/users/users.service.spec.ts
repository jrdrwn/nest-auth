import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDoc } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';

const createUserMock = (
  _id = 'test' as unknown as mongoose.Types.ObjectId,
  username = 'test',
  email = 'test',
  password = 'test',
): Partial<UserDoc> => ({
  _id,
  username,
  email,
  password,
});

const createModelMock = (): Partial<Model<User>> => ({
  findOne: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: createModelMock(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a user', async () => {
    const userMock = createUserMock();
    jest.spyOn(model, 'findOne').mockResolvedValue(userMock);

    const user = await service.findOne(userMock.username);
    expect(user).toEqual(userMock);
  });

  it('findOne should return null', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(null);

    const user = await service.findOne('');
    expect(user).toBeNull();
  });
});

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inject User repository
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    // Explicitly return undefined if findOne returns null
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }
}

// This should be a real class/interface representing a user entity
//export type User = any;
//
//@Injectable()
//export class UsersService {
//  private readonly users: User[];
//
//  constructor() {
//    this.users = [
//      {
//        id: 1,
//        username: 'john',
//        password: 'changeme',
//        roles: ['admin'],
//      },
//      {
//        id: 2,
//        username: 'chris',
//        password: 'secret',
//        roles: ['user'],
//      },
//      {
//        id: 3,
//        username: 'maria',
//        password: 'guess',
//        roles: ['user'],
//      },
//    ];
//  }
//
//  async findOne(username: string): Promise<User | undefined> {
//    return this.users.find((user) => user.username === username);
//  }
//}
//

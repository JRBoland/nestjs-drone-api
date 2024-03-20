import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto); // Create a new user instance
    return await this.usersRepository.save(user); // Save the user to the database
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}

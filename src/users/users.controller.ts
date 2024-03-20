import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { RolesGuard } from '../common/guards/roles.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
//@UseGuards(RolesGuard)
@Controller('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log('running users create()');
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(ValidationPipe)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // consider including PUT/DELETE methods
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  UseInterceptors,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { ParseIntPipe } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
@UseGuards(RolesGuard)
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
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //@Get('exists/:username')
  //async userExists(
  //  @Param('username') username: string,
  //): Promise<{ exists: boolean }> {
  //  const user = await this.usersService.findOne(username);
  //  return { exists: !!user };
  //}

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    console.log('running users findOne()');
    return `This action returns a #${id} user`;
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}

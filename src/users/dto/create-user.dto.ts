import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsArray()
  @IsString({ each: true })
  roles: string[];
}

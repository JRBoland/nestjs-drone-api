import { IsString, IsInt, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsBoolean()
  admin: boolean;
}

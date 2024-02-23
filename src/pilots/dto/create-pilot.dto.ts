import { IsString, IsInt } from 'class-validator';

export class CreatePilotDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

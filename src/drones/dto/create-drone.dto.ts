import { IsString, IsInt } from 'class-validator';

export class CreateDroneDto {
  @IsString()
  name: string;

  @IsInt()
  weight: number;
}

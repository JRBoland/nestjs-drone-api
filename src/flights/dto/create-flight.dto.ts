import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  flight_date?: Date;

  @IsNumber()
  @IsNotEmpty()
  pilot_id: number;

  @IsNumber()
  @IsNotEmpty()
  drone_id: number;

  @IsOptional()
  @IsString()
  flight_location?: string;

  @IsOptional()
  @IsBoolean()
  footage_recorded?: boolean;
}

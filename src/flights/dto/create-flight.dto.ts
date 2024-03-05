import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  flight_date: Date;

  @IsNumber()
  @IsNotEmpty()
  pilot_id: number;

  @IsNumber()
  @IsNotEmpty()
  drone_id: number;

  @IsString()
  flight_location: string;

  @IsBoolean()
  footage_recorded: boolean;
}

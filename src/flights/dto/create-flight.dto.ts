import { IsString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  drone: string;

  @IsString()
  pilot: string;
}

//Need to add timestamp (on top of ID, details etc.)

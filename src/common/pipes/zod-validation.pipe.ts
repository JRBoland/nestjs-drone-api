import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { dbg } from '../helpers/debug-helper';
import * as util from 'util';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      dbg(this, 'input value: ', util.inspect(value));
      dbg(this, 'metadata: ', util.inspect(metadata));
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      dbg(this, 'validation error: ', util.inspect(error.details));
      throw new BadRequestException('Validation failed');
    }
  }
}

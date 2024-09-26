import { PipeTransform, BadRequestException, HttpStatus } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { fromZodError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: fromZodError(error),
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

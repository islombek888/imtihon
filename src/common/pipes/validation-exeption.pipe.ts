import { ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export function formatErrors(errors: ValidationError[]) {
  return errors.map(err => ({
    field: err.property,
    errors: Object.values(err.constraints || {})
  }));
}

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      message: "Validation failed",
      errors: formatErrors(errors)
    });
  }
}
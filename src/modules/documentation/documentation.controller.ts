
import { Controller, Get } from '@nestjs/common';

@Controller('docs')
export class DocumentationController {
  @Get()
  info() {
    return {
      swagger: '/api-docs',
      swagger_json: '/api-docs/json',
      redoc: '/redoc',
    };
  }
}
import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function FindCountryByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get country by ID',
      description: 'Retrieve a single country by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, type: CountryResponseDto }),
    ApiResponse({
      status: 404,
      description: 'Country not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              errors: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                  required: ['message'],
                },
              },
            },
            required: ['errors'],
          },
          examples: {
            NotFound: {
              summary: 'Country not found',
              value: { errors: [{ message: 'Country not found' }] },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: { type: 'string', example: 'Internal server error' },
              },
              required: ['message'],
            },
          },
        },
        required: ['errors'],
      },
    }),
  );
}

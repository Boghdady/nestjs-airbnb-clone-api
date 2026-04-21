import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';

export function UpdateCountrySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update country by ID',
      description: 'Update an existing country by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateCountryDto }),
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

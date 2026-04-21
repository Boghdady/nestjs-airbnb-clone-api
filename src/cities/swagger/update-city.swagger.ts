import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';

export function UpdateCitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update city by ID',
      description: 'Update an existing city by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateCityDto }),
    ApiResponse({ status: 200, type: CityResponseDto }),
    ApiResponse({
      status: 404,
      description: 'City not found',
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
              summary: 'City not found',
              value: { errors: [{ message: 'City not found' }] },
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

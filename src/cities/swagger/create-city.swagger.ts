import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCityDto } from '../dtos/create-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';

export function CreateCitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a city',
      description: 'Create a new city',
    }),
    ApiBody({ type: CreateCityDto }),
    ApiResponse({ status: 201, type: CityResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation errors',
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
            NameRequired: {
              summary: 'Name is required',
              value: { errors: [{ message: 'name should not be empty' }] },
            },
            CountryRequired: {
              summary: 'Country is required',
              value: { errors: [{ message: 'country should not be empty' }] },
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

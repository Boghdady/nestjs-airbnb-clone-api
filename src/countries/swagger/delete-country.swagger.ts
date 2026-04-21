import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteCountrySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete country by ID',
      description: 'Delete an existing country by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Country deleted successfully' }),
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

import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteCurrencySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete currency by ID',
      description: 'Delete an existing currency by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Currency deleted successfully' }),
    ApiResponse({
      status: 404,
      description: 'Currency not found',
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
              summary: 'Currency not found',
              value: { errors: [{ message: 'Currency not found' }] },
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

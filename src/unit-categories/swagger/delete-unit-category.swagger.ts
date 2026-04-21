import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete unit category by ID',
      description: 'Delete an existing unit category by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Unit category deleted successfully' }),
    ApiResponse({
      status: 404,
      description: 'Unit category not found',
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
              summary: 'Unit category not found',
              value: { errors: [{ message: 'Unit category not found' }] },
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

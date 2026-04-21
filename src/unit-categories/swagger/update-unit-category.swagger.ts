import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';

export function UpdateUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update unit category by ID',
      description: 'Update an existing unit category by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateUnitCategoryDto }),
    ApiResponse({ status: 200, type: UnitCategoryResponseDto }),
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

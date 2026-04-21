import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';

export function CreateUnitCategorySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a unit category',
      description: 'Create a new unit category',
    }),
    ApiBody({ type: CreateUnitCategoryDto }),
    ApiResponse({ status: 201, type: UnitCategoryResponseDto }),
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
            IconRequired: {
              summary: 'Icon is required',
              value: { errors: [{ message: 'icon should not be empty' }] },
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

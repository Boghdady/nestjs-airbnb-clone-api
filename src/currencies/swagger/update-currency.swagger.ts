import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

export function UpdateCurrencySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update currency by ID',
      description: 'Update an existing currency by its ID',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: UpdateCurrencyDto }),
    ApiResponse({ status: 200, type: CurrencyResponseDto }),
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

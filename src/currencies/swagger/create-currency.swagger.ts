import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';

export function CreateCurrencySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a currency',
      description: 'Create a new currency',
    }),
    ApiBody({ type: CreateCurrencyDto }),
    ApiResponse({ status: 201, type: CurrencyResponseDto }),
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
            CurrencyCodeRequired: {
              summary: 'Currency code is required',
              value: { errors: [{ message: 'currencyCode should not be empty' }] },
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

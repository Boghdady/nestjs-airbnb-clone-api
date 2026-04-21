import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpsertAppSettingsDto } from '../dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from '../dtos/app-settings-response.dto';

export function UpsertAppSettingsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Upsert app settings',
      description: 'Create or update the application settings',
    }),
    ApiBody({ type: UpsertAppSettingsDto }),
    ApiResponse({ status: 200, type: AppSettingsResponseDto }),
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
            VatRateMax: {
              summary: 'VAT rate exceeds maximum',
              value: { errors: [{ message: 'vatRate must not be greater than 25' }] },
            },
            MinPriceMin: {
              summary: 'Min price below minimum',
              value: { errors: [{ message: 'minPrice must not be less than 0' }] },
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

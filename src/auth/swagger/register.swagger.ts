import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function SignupSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register a new user',
      description: 'Register a new user and receive access and refresh tokens',
    }),
    ApiResponse({ status: 201, type: AuthResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation or business logic errors',
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
                    message: {
                      type: 'string',
                    },
                  },
                  required: ['message'],
                },
              },
            },
            required: ['errors'],
          },
          examples: {
            EmailExists: {
              summary: 'Email already exists',
              value: {
                errors: [
                  {
                    message: 'Email already exists',
                  },
                ],
              },
            },
            PhoneExists: {
              summary: 'Phone number already exists',
              value: {
                errors: [
                  {
                    message: 'Phone number already exists',
                  },
                ],
              },
            },
            ValidationError: {
              summary: 'Invalid input data',
              value: {
                errors: [
                  {
                    message: 'name should not be empty',
                  },
                ],
              },
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
                message: {
                  type: 'string',
                  example: 'Internal server error',
                },
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

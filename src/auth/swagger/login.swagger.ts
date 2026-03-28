import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'User login',
      description: 'Authenticate user and receive access and refresh tokens',
    }),
    ApiResponse({ status: 200, type: AuthResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid credentials or validation errors',
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
            InvalidCredentials: {
              summary: 'Invalid credentials',
              value: {
                errors: [
                  {
                    message: 'Invalid credentials',
                  },
                ],
              },
            },
            EmailRequired: {
              summary: 'Email is required',
              value: {
                errors: [
                  {
                    message: 'email should not be empty',
                  },
                ],
              },
            },
            PasswordRequired: {
              summary: 'Password is required',
              value: {
                errors: [
                  {
                    message: 'password should not be empty',
                  },
                ],
              },
            },
            InvalidEmail: {
              summary: 'Invalid email format',
              value: {
                errors: [
                  {
                    message: 'email must be an email',
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

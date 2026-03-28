import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from '../dtos/auth-response.dto';

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh access token',
      description: 'Generate new access and refresh tokens using a valid refresh token',
    }),
    ApiResponse({ status: 200, type: AuthResponseDto }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Invalid or expired refresh token',
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
            InvalidToken: {
              summary: 'Invalid refresh token',
              value: {
                errors: [
                  {
                    message: 'Invalid refresh token',
                  },
                ],
              },
            },
            ExpiredToken: {
              summary: 'Expired refresh token',
              value: {
                errors: [
                  {
                    message: 'Invalid refresh token',
                  },
                ],
              },
            },
            TokenNotFound: {
              summary: 'Token not found in database',
              value: {
                errors: [
                  {
                    message: 'Invalid refresh token',
                  },
                ],
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid token type or validation errors',
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
            InvalidTokenType: {
              summary: 'Invalid token type',
              value: {
                errors: [
                  {
                    message: 'Invalid refresh token',
                  },
                ],
              },
            },
            TokenRequired: {
              summary: 'Refresh token is required',
              value: {
                errors: [
                  {
                    message: 'refreshToken should not be empty',
                  },
                ],
              },
            },
            TokenMustBeString: {
              summary: 'Refresh token must be a string',
              value: {
                errors: [
                  {
                    message: 'refreshToken must be a string',
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

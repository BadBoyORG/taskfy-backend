import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ReturnUsersDto } from './dto/returnUsers.dto';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { DeleteUsersDto } from './dto/deleteUsers.dto';

export const GetProfileDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Get user profile',
        description:
          'Endpoint for user profile information. The Authorization Bearer of the request must contain the Access Token.',
        operationId: 'getProfile',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Return user profile information',
        type: ReturnUsersDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const UpdateProfileDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Update user profile',
        description:
          'Endpoint for updating user profile information. The Authorization Bearer of the request must contain the Access Token and the request body must contain mandatory field such username',
        operationId: 'updateProfile',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiBody({
        type: UpdateUsersDto,
        description: 'User profile information to be updated',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Return updated user profile information',
        type: ReturnUsersDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Username invalid format or length',
        example: {
          message: [
            'Use only letters, numbers, ".", "-" or "_"',
            'username must be shorter than or equal to 20 characters',
            'username must be longer than or equal to 3 characters',
            'username must be a string',
            'Unexpected token \'}\', ..."rname": \r\n}" is not valid JSON',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
      ApiResponse({
        status: 409,
        description: 'Username is already taken',
        example: {
          message: 'Username is already taken',
          error: 'Conflict',
          statusCode: 409,
        },
      }),
    ],
  );

export const ChangePasswordDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Change user password',
        description:
          'Endpoint for changing user password. The Authorization Bearer of the request must contain the Access Token and the request body must contain mandatory field such password',
        operationId: 'changePassword',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiBody({
        type: ChangePasswordDto,
        description: 'New password',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Password changed successfully',
        example: {
          message: 'Your password has been changed successfully',
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Password invalid format or length',
        example: {
          message: [
            'Password must begin with an uppercase letter and include at least one lowercase letter, number, and special characters',
            'newPassword must be shorter than or equal to 100 characters',
            'newPassword must be longer than or equal to 12 characters',
            'newPassword must be a string',
            'newPassword should not be empty',
            'currentPassword must be a string',
            'currentPassword should not be empty',
            'Unexpected token \',\', ..."assword": ,\r\n    "cu"... is not valid JSON',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access or Current password is incorrect',
        examples: {
          Unauthorized: {
            summary: 'Unauthorized access',
            value: {
              message: 'Unauthorized access',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
          CurrentPasswordIncorrect: {
            summary: 'Current password is incorrect',
            value: {
              message: 'Current password is incorrect',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      }),
    ],
  );

export const DeleteUsersDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Delete user',
        description:
          'Endpoint for deleting user. The Authorization Bearer of the request must contain the Access Token and the request body must contain mandatory field such confirmationPassword',
        operationId: 'deleteUser',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiBody({
        type: DeleteUsersDto,
        description: 'Confirmation password',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'User deleted successfully',
        example: {
          message: 'Account deleted successfully.',
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Confirmation password invalid format or length',
        example: {
          message: [
            'confirmationPassword must be a string',
            'confirmationPassword should not be empty',
            'Unexpected token \',\', ..."firmationPassword": ,\r\n... is not valid JSON',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access or Current password is incorrect',
        examples: {
          Unauthorized: {
            summary: 'Unauthorized access',
            value: {
              message: 'Unauthorized access',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
          CurrentPasswordIncorrect: {
            summary: 'Current password is incorrect',
            value: {
              message: 'Current password is incorrect',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      }),
    ],
  );

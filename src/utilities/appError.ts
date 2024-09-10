import { GraphQLError } from 'graphql';
import { UNAUTHORIZED } from './messages.js';

interface AppErrorOptions {
  message: string;
  code?: string;
  status?: number;
  originalError?: Error;
}

export class AppError extends GraphQLError {
  constructor({ message, code, originalError, status }: AppErrorOptions) {
    const errorExtensions = {
      code: code || 'INTERNAL_SERVER_ERROR',
      http: {
        status: status
      },
      originalErrorStack: originalError ? originalError.stack : undefined,
    };

    super(message, { extensions: errorExtensions });

    console.error(originalError);
  }
}

export class AuthenticationError extends AppError {
  constructor(error: Error) {
    super({ message: UNAUTHORIZED, code: ErrorCodes.UNAUTHORIZED, originalError: error, status: STATUS_CODES.UN_AUTHORISED })
  }
}

export function isAppError(error: any) {
  if (error instanceof AppError) {
    throw error;
  }
}

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

export const ErrorCodes = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  BAD_USER_INPUT: 'BAD_USER_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  INVALID_TOKEN: 'INVALID_TOKEN',
};

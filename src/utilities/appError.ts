import { GraphQLError } from 'graphql';

interface AppErrorOptions {
  message: string;
  code?: string;
  extensions?: Record<string, any>;
  originalError?: Error; 
}

export class AppError extends GraphQLError {
  constructor({ message, code, extensions, originalError }: AppErrorOptions) {
    // Create a detailed error message including the original error stack trace if provided
    const errorExtensions = {
      code: code || 'INTERNAL_SERVER_ERROR',
      ...extensions,
      originalErrorStack: originalError ? originalError.stack : undefined, // Store stack trace in extensions
    };

    super(message, { extensions: errorExtensions });
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

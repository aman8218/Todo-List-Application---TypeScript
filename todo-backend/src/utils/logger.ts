import ErrorLog from '../models/ErrorLog';

interface LogErrorParams {
  message: string;
  stack?: string;
  statusCode: number;
  method: string;
  url: string;
  userId?: string;
}

export const logError = async (params: LogErrorParams): Promise<void> => {
  try {
    await ErrorLog.create(params);
  } catch (error) {
    console.error('Failed to log error to database:', error);
  }
};
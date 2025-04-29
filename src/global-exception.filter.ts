import { ArgumentsHost, Catch, ExceptionFilter, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse.message || exceptionResponse;

    response.status(status).json({
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      error: 'Bad Request',
    });
  }
}

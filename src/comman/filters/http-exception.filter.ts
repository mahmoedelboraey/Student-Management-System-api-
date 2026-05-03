import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
@Catch(HttpException)
export class HttpExceptionFilter
    implements ExceptionFilter
{
    catch(
        exception: HttpException,
        host: ArgumentsHost
    ) {
        const ctx = host.switchToHttp();

        const response =
            ctx.getResponse<Response>();

        const request =
            ctx.getRequest<Request>();

        const status =
            exception.getStatus();

        const exceptionResponse =
            exception.getResponse();

        let message = "Error";

        let errors: unknown[] = [];

        if (
            typeof exceptionResponse ===
            "object"
        ) {
            message =
                (exceptionResponse as any)
                    .message || "Error";

            errors =
                (exceptionResponse as any)
                    .errors || [];
        }

        response.status(status).json({
            statusCode: status,

            message,

            errors,

            path: request.url,

            timestamp:
                new Date().toISOString(),
        });
    }
}
export interface IErrorResponse {
    message: string;
    statusCode: number;
    status: string;
    serializeErrors(): IError;
}

export interface IError {
    message: string;
    statusCode: number;
    status: string;
}

export abstract class CustomError extends Error {
    abstract status: string;
    private readonly statusCode: number;

    protected constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    serializeErrors(): IError {
        return {
            message: this.message,
            status: this.status,
            statusCode: this.statusCode,
        };
    }
}

export class BadRequestError extends CustomError {
    status = "error";
    constructor(message: string, statusCode?: number) {
        super(message, statusCode || 500);
    }
}
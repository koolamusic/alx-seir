export default class HttpError extends Error {
    status: number;

    constructor(status: number, message?: string) {
        super();
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }
        this.status = status;
        if (status === undefined) {
            this.status = 500;
        }
        switch (status) {
            case 400:
                this.status = 400;
                this.name = 'Bad request.';
                this.message = message || 'Bad request.';
                break;
            case 401:
                this.status = 401;
                this.name = 'Unauthorized.';
                this.message = message || 'Unauthorized.';
                break;
            case 403:
                this.status = 403;
                this.name = 'Forbidden.';
                this.message = message || 'Forbidden.';
                break;
            case 404:
                this.status = 404;
                this.name = 'Not Found';
                this.message = message || 'Resource not found.';
                break;
            case 409:
                this.status = 409;
                this.name = 'Conflict';
                this.message = message || 'Please check your data.';
                break;
            case 422:
                this.status = 422;
                this.name = 'Validation error';
                this.message = message || 'Please check your data.';
                break;
            default:
                this.status = 500;
                this.name = 'Internal server error';
                this.message = message || 'Internal server error.';
                break;
        }
    }
}

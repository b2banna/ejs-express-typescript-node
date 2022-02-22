import HttpStatus from 'http-status-codes';

export class ResponseDTO<T> {
  readonly statusCode: number = HttpStatus.BAD_REQUEST;
  readonly message: string = HttpStatus.getStatusText(this.statusCode);
  readonly body: T;
  constructor(statusCode: number, message: string, body: T) {
    this.statusCode = statusCode;
    this.message = message || HttpStatus.getStatusText(this.statusCode);
    this.body = body;
  }
}

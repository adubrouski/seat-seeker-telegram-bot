interface ErrorDetails {
  status: number;
  statusText: string;
}

export class TelegramConnectionError extends Error {
  constructor(public message: string, public details: ErrorDetails) {
    super(message);
    this.details = details;
  }
}

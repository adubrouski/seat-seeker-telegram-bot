interface ErrorDetails {
  code: number;
  description: string;
}

export class ConnectionError extends Error {
  constructor(public message: string, public details: ErrorDetails) {
    super(message);
  }
}

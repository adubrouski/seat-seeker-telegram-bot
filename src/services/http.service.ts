import fetch, { HeadersInit } from 'node-fetch';

export class HttpService {
  constructor(private domain: string) {}

  get(endpoint: string, headers?: HeadersInit) {
    return fetch(`${this.domain}${endpoint}`, {
      method: 'GET',
      headers,
    });
  }
}

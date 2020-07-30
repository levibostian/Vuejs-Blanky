/**
 * 500 - 600 status code for HTTP response
 */
export class ServerDownError extends Error {
  constructor(message: string) {
    super(message)
  }
}

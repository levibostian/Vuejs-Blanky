/**
 * 401 http response status code
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

/**
 * When the HTTP call did not get a response back.
 */
export class NetworkError extends Error {
  constructor(message: string) {
    super(message)
  }
}

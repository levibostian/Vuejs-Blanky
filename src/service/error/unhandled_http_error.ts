/**
 * Hopefully never happens. This is only constructed when there was an error encountered in a HTTP call that was not handled by any code. It's a developer bug that should be reported to the error reporter tool
 */
export class UnhandledHttpError extends Error {
  constructor(message: string) {
    super(message)
  }
}

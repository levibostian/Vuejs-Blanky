/**
 * An error that was unhandled by the developer. Should hopefully never happen. But if it does, make sure to report it to the team so it gets fixed.
 */
export class DeveloperError extends Error {
  constructor(message: string) {
    super(message)
  }
}

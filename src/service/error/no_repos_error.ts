/**
 * If the user has no GitHub repos
 */
export class NoReposError extends Error {
  constructor(message: string) {
    super(message)
  }
}

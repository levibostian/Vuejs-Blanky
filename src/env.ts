export interface Environment {
  baseUrl: string
  development: boolean
}

export const getEnv = (key: string): string => {
  // eslint-disable-next-line no-process-env
  const value: string = process.env[key]!

  if (value === undefined || value === null) throw Error(`Forgot to create ${key} in .env`)

  return value
}

export const Env: Environment = {
  /*
  If you need a `number` type, use `parseInt(getEnv("BRUTEFORCE_FREE_RETRIES"))`
  */
  baseUrl: getEnv("BASE_URL"),
  development: getEnv("DEVELOPMENT") === "true"
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance } from "axios"
import * as Result from "@/type/result"
import { ServerDownError, UnauthorizedError, UnhandledHttpError, NetworkError, DeveloperError } from "./error"

export interface RequestConfig {
  body?: any
  headers?: any
}

export interface ProcessedResponse<T = any> {
  statusCode: number
  body?: T
}

type ExtraErrorHandler<T = any> = (response: ProcessedResponse<T>) => Error | null

export interface Http {
  get<T = any>(path: string, request?: RequestConfig, extraErrorHandler?: ExtraErrorHandler): Promise<Result.Result<T>>
}

export class GitHubHttp implements Http {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.github.com",
      validateStatus: (status) => {
        return true // make all responses with a status code resolve in the promise. We will manually parse the status code
      }
    })
  }

  get<T = any>(
    path: string,
    request?: RequestConfig,
    extraErrorHandler?: ExtraErrorHandler
  ): Promise<Result.Result<T>> {
    return this.axiosInstance
      .get(path, request)
      .then((response) => {
        const processedResponse: ProcessedResponse<T> = {
          statusCode: response.status,
          body: response.data
        }

        if (processedResponse.statusCode >= 200 && processedResponse.statusCode < 300) {
          return response.data
        } else {
          return this.processResponse(processedResponse, extraErrorHandler)
        }
      })
      .catch((error) => this.processNoResponse(error))
  }

  private processNoResponse(error: any): Error {
    // The request was made, but no response was recieved.
    if (error.request) {
      return new NetworkError("Sorry! There might be a problem with your Internet connection. Please, try again.")
    } else {
      // TODO honeybadger record as it's probably a developer error. the request was not able to process and be attempted.
      return new DeveloperError(
        "Sorry! An error happened that we did not expect. The team has been notified. Please, try again later."
      )
    }
  }

  private processResponse(response: ProcessedResponse, extraErrorHandler?: ExtraErrorHandler): Error {
    const code: number = response.statusCode

    switch (true) {
      case code >= 500:
        // TODO honeybadger record
        return new ServerDownError(`Sorry! It appears the GitHub system is down. Try again later.`)
      case code == 401:
        // TODO logout user.
        return new UnauthorizedError("Sorry! You need to login again. Then try again.")
      default:
        if (extraErrorHandler) {
          const error = extraErrorHandler(response)
          if (error) {
            return error
          }
        }

        // TODO honeybadget record error since it's going to be unhandled
        return new UnhandledHttpError(
          "Sorry! An error happened that we did not expect. The team has been notified. Please, try again later."
        )
    }
  }
}

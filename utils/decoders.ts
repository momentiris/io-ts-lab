import * as T from 'io-ts'
import * as E from 'fp-ts/Either'
import { AxiosResponse } from 'axios'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/PathReporter'

export const decodeResponseWith =
  <ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown>(
    c: T.Type<ApplicationType, EncodeTo, DecodeFrom>
  ) =>
  (response: any): T.TypeOf<typeof c> =>
    decodeWith(c)(response)

export const decodeWith =
  <ApplicationType = any, EncodeTo = ApplicationType, DecodeFrom = unknown>(
    codec: T.Type<ApplicationType, EncodeTo, DecodeFrom>
  ) =>
  (input: DecodeFrom): ApplicationType =>
    pipe(
      codec.decode(input),
      E.getOrElseW((errors) => {
        throw new Error(failure(errors).join('\n'))
      })
    )

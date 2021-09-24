import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import reporter from 'io-ts-reporters'

import * as t from 'io-ts'

export async function fetchJson<T, O, I>(
  url: string,
  validator: t.Type<T, O, I>,
  init?: RequestInit
): Promise<E.Either<Error, T>> {
  try {
    const response = await fetch(url, init)
    const json: I = await response.json()
    const result = validator.decode(json)

    return pipe(
      result,
      E.fold(
        (errors: t.Errors) => {
          const messages = reporter.report(result)
          return E.left(new Error(messages.join('\n')))
        },
        (value: T) => {
          return E.right(value)
        }
      )
    )
  } catch (err: any) {
    return Promise.resolve(E.left(err))
  }
}

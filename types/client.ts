import * as t from 'io-ts'

export const UserCodec = t.type({
  id: t.string,
  fullName: t.string,
  username: t.string,
  email: t.string,
})

export const UsersCodec = t.array(UserCodec)

export type User = t.TypeOf<typeof UserCodec>
export type Users = t.TypeOf<typeof UsersCodec>

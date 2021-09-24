import faker from 'faker'
import { User } from '../types/api'

export const createRandomUser = (): User => ({
  id: faker.datatype.uuid(),
  fullName: faker.name.findName(),
  username: Math.random() > 0.5 ? null : faker.internet.userName(),
  email: faker.internet.email(),
})

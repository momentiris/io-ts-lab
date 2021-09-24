import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '../../types/api'
import { createRandomUser } from '../../utils/users'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  res.status(200).json(Array.from({ length: 10 }).map(createRandomUser))
}

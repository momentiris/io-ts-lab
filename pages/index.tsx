import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.css'
import { Users, UsersCodec } from '../types/client'

import { foldW } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

import { fetchJson } from '../utils/fetch'

const Home = ({
  users,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={styles.container}>
      {users?.map((user) => (
        <div key={user.id} className='user-card'>
          {user.fullName}
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps<{ users?: Users; error?: string }> =
  () =>
    getUsers().then((users) =>
      pipe(
        users,
        foldW(
          (l) => {
            return { props: { error: l.message } }
          },
          (r) => {
            return { props: { users: r } }
          }
        )
      )
    )

const getUsers = () => fetchJson('http://localhost:3000/api/users', UsersCodec)

export default Home

import { NextPage, GetStaticProps } from 'next';
import Link from 'next/link';
import { initializeApollo } from '../libs/apolloClient';
import { GET_USER } from '../queries/queries';
import { GetUsersQuery, Users } from '../types/generated/graphql';
import { Layout } from '../components/Layout/Layout';

type Props = {
  users: ({
    __typesname?: 'users'
  }  & Pick<Users, 'id' | 'name' | 'email' | 'password' | 'createdAt'>)[]
}

const HasuraSSG: NextPage<Props> = ({ users }) => {
  return (
    <Layout title='hasura SSG'>
      <p className='mb-3 font-bold'>SSG + ISR</p>
      {
        users?.map((user) => {
          return (
            <Link key={user.id} href={`/users/${user.id}`}>
              <a className='my-1 cursor-pointer' data-testid={`link-${user.id}`}>
                {user.name}
              </a>
            </Link>
          )
        })
      }
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USER
  });
  return {
    props: { users: data.users },
    revalidate: 1
  }
}

export default HasuraSSG;
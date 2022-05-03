import { NextPage } from 'next';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';
import { Layout } from '../components/Layout/Layout';

const UserList: NextPage = (): JSX.Element => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USER, {
    fetchPolicy: 'network-only'
  });

  if(error) {
    return (
      <Layout title='Hasura error'>
        <p>Error: { error.message }</p>
      </Layout>
    )
  };
  return (
    <Layout title='User list'>
      <p className='mb-6 font-bold'>Hasura main page</p>
      {
        data?.users.map((user) => {
          return (
            <p className='my-1' key={user.id}>{ user.name }</p>
          )
        })
      }
      <Link href='/hasura-sub'>
        <a className='mt-6'>Next</a>
      </Link>
    </Layout>
  )
}

export default UserList;
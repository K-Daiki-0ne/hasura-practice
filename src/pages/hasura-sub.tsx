import { NextPage } from 'next';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_LOCAL, GET_USER } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';
import { Layout } from '../components/Layout/Layout';

const FetchSub: NextPage = () => {
  const { data } = useQuery<GetUsersQuery>(GET_USER_LOCAL);
  return (
    <Layout title='Hasura read policy read cache'>
      <p className='mb-6 font-bold'>Direct read out form cache</p>
      {
        data?.users.map((user) => {
          return (
            <p className='my-1' key={user.id}>{ user.name }</p>
          )
        })
      }
      <Link href='/hasura-main'>
        <a className='mt-6'></a>
      </Link>
    </Layout>
  )
};

export default FetchSub;
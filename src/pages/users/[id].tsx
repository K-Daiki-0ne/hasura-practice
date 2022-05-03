import { FC } from 'react';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import { initializeApollo } from '../../libs/apolloClient';
import { GET_USER_IDS, GET_USERBY_ID } from '../../queries/queries';
import {
  GetUSerByIdQuery,
  GetUSerIdsQuery,
  Users
} from '../../types/generated/graphql';
import { Layout } from '../../components/Layout/Layout';

type Props = {
  user: {
    __typename: 'users',
  } & Pick<Users, 'id' | 'name' | 'password' | 'email' | 'createdAt'>
}

// eslint-disable-next-line react/display-name
const UserDetail: FC<Props> = ({ user }) => {
  if(!user) {
    return (
      <Layout title='loading...'>loading...</Layout>
    )
  };
  return (
    <Layout title={user.name}>
      <p className='text-xl font-bold'>User detail</p>
      <p className='m-4'>
        {'ID: '}
        {user.id}
      </p>
      <p className='mb-4 text-xl font-bold'>{user.name}</p>
      <p className='mb-4 text-xl font-bold'>{user.createdAt}</p>
      <Link href='/hasura-svg'>
        <div className='flex cursor-pointer mt-12'>
          <ChevronDoubleLeftIcon 
            data-testid='auth-to-main'
            className='h-5 w-5 mr-3 text-blue-500'
          />
          <span className='back-to-main'>Back to main-ssg-page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default UserDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUSerIdsQuery>({
    query: GET_USER_IDS,
  })
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUSerByIdQuery>({
    query: GET_USERBY_ID,
    variables: { id: params.id },
  })
  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 1,
  }
}

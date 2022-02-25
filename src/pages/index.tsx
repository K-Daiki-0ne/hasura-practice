import { NextPage } from 'next'
import { Layout } from '../components/Layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <p className='text-3xl font-bold'>NextJS + GraphQL with Hasura(Cloud)</p>
    </Layout>
  )
};

export default Home;
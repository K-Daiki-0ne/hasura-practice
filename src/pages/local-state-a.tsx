import { NextPage } from 'next';
import { LocalState } from '../components/LocalState/LocalState';
import { Layout } from '../components/Layout/Layout';

const LocalStateA: NextPage = (): JSX.Element => {
  return (
    <Layout title='Local State'>
      <LocalState/>
    </Layout>
  )
};

export default LocalStateA;
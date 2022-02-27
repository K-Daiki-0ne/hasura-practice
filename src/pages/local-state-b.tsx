import { NextPage } from 'next';
import { LocalStateView } from '../components/LocalStateView/LocalStateView';
import { Layout } from '../components/Layout/Layout';

const LocalStateB: NextPage = (): JSX.Element => {
  return (
    <Layout title='Local State View'>
      <LocalStateView />
    </Layout>
  )
};

export default LocalStateB;
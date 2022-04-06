import { Button, Result } from 'antd';
import Page from '../components/Page';

const NotFoundPage = () => (
  <Page title="Page Not found | ETNY">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  </Page>
);

export default NotFoundPage;

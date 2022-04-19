import { Button, Result } from 'antd';

const ErrorHandler = () => (
  <Result
    status="warning"
    title="An error occurred, please try again."
    extra={
      <Button type="primary" key="console">
        Go to home
      </Button>
    }
  />
);

export default ErrorHandler;

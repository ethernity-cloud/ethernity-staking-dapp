import { Suspense, lazy } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { Spin } from 'antd';

const loadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const loading = () => (
  <div className="animated antFadeIn pt-3 text-center">
    <Spin indicator={loadingIndicator} />
  </div>
);

const Loadable = (Component) => (props) =>
  (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    <Suspense fallback={<div className="h-full">{loading()}</div>}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

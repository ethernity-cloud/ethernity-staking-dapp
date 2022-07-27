import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const loadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const LoadingIndicator = () => (
  <div className="animated antFadeIn pt-3 text-center">
    <Spin indicator={loadingIndicator} />
  </div>
);

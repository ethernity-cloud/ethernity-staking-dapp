import { Layout } from 'antd';
import React from 'react';
import { LoadingIndicator } from './LoadingIndicator';

const { Content } = Layout;

export const PageLoadingIndicator = () => (
  <Layout className="h-full dark:bg-etny-background font-sans">
    <Layout className="pt-24 bg-white dark:bg-etny-background h-full min-h-screen">
      <Content className="bg-white dark:bg-etny-background">
        <LoadingIndicator />
      </Content>
    </Layout>
  </Layout>
);

import React, { useState, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Drawer, Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { authRoutes } from '../routes/routes';
import Navbar from './app/Navbar';
import MobileSidebarMenu from './app/MobileSidebarMenu';

const { Content } = Layout;

const loadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const loading = () => (
  <div className="animated antFadeIn pt-3 text-center">
    <Spin indicator={loadingIndicator} />
  </div>
);

const ApplicationLayout = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onDrawerClosed = () => {
    setMobileMenuVisible(false);
  };

  return (
    <Layout className="h-full font-sans">
      <Navbar onMenuClick={() => setMobileMenuVisible(!mobileMenuVisible)} />
      <Layout className="pt-24 bg-white dark:bg-etny-background h-full min-h-screen">
        {/* <SidebarMenu className="hidden md:block" /> */}
        <Drawer
          className="md:hidden"
          width={320}
          title="ETNY Staking"
          placement="left"
          onClose={onDrawerClosed}
          visible={mobileMenuVisible}
          bodyStyle={{ paddingBottom: 80, padding: 0 }}
          headerStyle={{ backgroundColor: '#3FA9FF', color: '#fff', height: 64 }}
        >
          <MobileSidebarMenu onMenuItemSelect={onDrawerClosed} />
        </Drawer>
        <Content className="bg-white dark:bg-etny-background">
          <Suspense fallback={loading()}>
            <Routes>
              {authRoutes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ApplicationLayout;

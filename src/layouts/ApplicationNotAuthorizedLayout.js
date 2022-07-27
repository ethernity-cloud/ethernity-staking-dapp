import React, { useState, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Drawer, Layout, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { authRoutes, welcomeRoutes } from '../routes/routes';
import Navbar from './app/Navbar';
import MobileSidebarMenu from './app/MobileSidebarMenu';
import NavbarNotLoggedIn from './app/NavbarNotLoggedIn';

const { Content } = Layout;

const loadingIndicator = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const loading = () => (
  <div className="animated antFadeIn pt-3 text-center">
    <Spin indicator={loadingIndicator} />
  </div>
);

const ApplicationNotAuthorizedLayout = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onDrawerClosed = () => {
    setMobileMenuVisible(false);
  };

  const renderRoutes = () => (
    <Layout className="pt-24 bg-white dark:bg-etny-background h-full min-h-screen">
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
  );

  return (
    <Layout className="h-full font-sans">
      <NavbarNotLoggedIn />
      {renderRoutes()}
    </Layout>
  );
};

export default ApplicationNotAuthorizedLayout;

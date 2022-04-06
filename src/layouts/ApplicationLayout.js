import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Drawer, Layout } from 'antd';
import { useWeb3React } from '@web3-react/core';
import SidebarMenu from './app/SidebarMenu';
import { authRoutes, welcomeRoutes } from '../routes/routes';
import Navbar from './app/Navbar';
import MobileSidebarMenu from './app/MobileSidebarMenu';

const { Content } = Layout;
const ApplicationLayout = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { active, account, activate, deactivate } = useWeb3React();

  const onDrawerClosed = () => {
    setMobileMenuVisible(false);
  };

  const className = active ? `h-screen` : ``;
  return (
    <Layout className="h-full">
      <Navbar onMenuClick={() => setMobileMenuVisible(!mobileMenuVisible)} />
      <Layout className="pt-16 bg-white dark:bg-gray-800 h-full min-h-screen">
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
        <Content className="bg-white dark:bg-gray-700">
          <Routes>
            {!active && welcomeRoutes.map((route, index) => <Route key={index} {...route} />)}
            {active && authRoutes.map((route, index) => <Route key={index} {...route} />)}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ApplicationLayout;

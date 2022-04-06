import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';

import { useWeb3React } from '@web3-react/core';
import { authRoutes } from '../../routes/routes';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import useTheme from '../../hooks/useTheme';

export default function SidebarMenu({ className }) {
  const location = useLocation();
  const { isCollapsed } = useCollapseDrawer();
  const { theme } = useTheme();
  const { active } = useWeb3React();

  if (!active) {
    return <></>;
  }
  if (active) {
    return (
      <Layout.Sider
        className={`${className} bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-500`}
        collapsed={isCollapsed}
        width={210}
      >
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme={theme}
          className="bg-white dark:bg-gray-800 text-black dark:text-white border-0"
        >
          {authRoutes.map((route, index) =>
            route.visible && !route.welcome ? (
              <Menu.Item key={route.path || '/404'} className="hover:bg-white">
                <Link to={route.path || '/404'}>
                  <Icon component={route.icon} className="text-black dark:text-white font-bold text-lg" />
                  <span className="text-black dark:text-white font-semibold">{route.name}</span>
                </Link>
              </Menu.Item>
            ) : (
              <Fragment key={index} />
            )
          )}
        </Menu>
      </Layout.Sider>
    );
  }
}

SidebarMenu.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object
};

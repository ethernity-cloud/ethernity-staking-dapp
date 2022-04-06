import React, { Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';

import { authRoutes } from '../../routes/routes';

const MobileSidebarMenu = ({ className, onMenuItemSelect }) => {
  const location = useLocation();

  return (
    <Layout.Sider className={`${className} bg-white w-80`}>
      <Menu selectedKeys={[location.pathname]} mode="inline" className="w-80" onSelect={onMenuItemSelect}>
        {authRoutes.map((route, index) =>
          route.visible ? (
            <Menu.Item key={route.path || '/404'}>
              <Link to={route.path || '/404'}>
                <Icon component={route.icon} />
                <span>{route.name}</span>
              </Link>
            </Menu.Item>
          ) : (
            <Fragment key={index} />
          )
        )}
      </Menu>
    </Layout.Sider>
  );
};
export default MobileSidebarMenu;

import React, { Fragment } from 'react';
import Icon, { MenuUnfoldOutlined, BellFilled } from '@ant-design/icons';
import { Badge, Button, Card, Layout, List, Menu, Popover, Row, Typography } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import MetaMaskButton from '../../components/MetaMaskButton';
import useTheme from '../../hooks/useTheme';
import { authRoutes } from '../../routes/routes';
import Logo from '../../components/Logo';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification_icon.svg';

const { Header } = Layout;
const { Title } = Typography;

const data = [
  {
    title: 'Staking pot 0001',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'APPROVED',
    datetime: '10/02/2022'
  },
  {
    title: 'Staking pot 0001',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'DECLINED',
    datetime: '10/02/2022'
  },
  {
    title: 'Staking pot 0003',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'NEW STAKING',
    datetime: '10/02/2022'
  },
  {
    title: 'Staking pot 0003',
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'APPROVED',
    datetime: '10/02/2022'
  },
  {
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'APPROVED',
    datetime: '10/02/2022'
  },
  {
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'APPROVED',
    datetime: '10/02/2022'
  },
  {
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'Desc',
    datetime: '10/02/2022'
  }
];

const menu = (
  <Card style={{ width: 409, maxHeight: 500 }} bodyStyle={{ padding: 0 }} className="notifications-card">
    <List className="max-h-80 overflow-auto notifications-list" title="New Notifications">
      <List.Item className="notifications-list__item-title notifications-list__item">
        <Title level={3} className="notifications-title">
          New Notifications
        </Title>
      </List.Item>
      {data.map((item, i) => (
        <List.Item key={item.key || i} className="notifications-list__item">
          <List.Item.Meta
            avatar={<NotificationIcon height={20} width={20} />}
            className="px-2 notifications-meta"
            title={item.title || 'New staking offer'}
            description="7 hours ago"
          />
        </List.Item>
      ))}
      <List.Item className="notifications-list__item-title notifications-list__item">
        <Title level={3} className="notifications-title text-white">
          Old Notifications
        </Title>
      </List.Item>
      {data.map((item, i) => (
        <List.Item key={item.key || i} className="notifications-list__item notifications-list__item-old">
          <List.Item.Meta
            avatar={<NotificationIcon height={20} width={20} />}
            className="px-2 notifications-meta notifications-meta-old"
            title={item.title || 'New staking offer'}
            description="7 hours ago"
          />
        </List.Item>
      ))}
      <List.Item className="notifications-list__item-read">
        <Title level={3} className="notifications-title">
          Mark all as read
        </Title>
      </List.Item>
    </List>
  </Card>
);

const Navbar = ({ onMenuClick }) => {
  const { isCollapsed, onToggleCollapse } = useCollapseDrawer();
  const [isMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);
  const { active } = useWeb3React();
  const { theme, onThemeChange, THEME_LIGHT, THEME_DARK } = useTheme();

  const logoWidth = () => {
    if (isMobile) return 0;
    if (!active) return 60;
    return isCollapsed ? 80 : 200;
  };
  const onNavMenuClick = () => {
    if (!isMobile) {
      onToggleCollapse();
    }
    onMenuClick();
  };

  const onThemeChanged = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === THEME_LIGHT) {
      onThemeChange('dark');
    } else {
      onThemeChange('light');
    }
  };

  const backgroundColor = isMetamaskLoggedIn ? `bg-etny-500 dark:bg-etny-800` : `bg-white dark:bg-etny-background`;
  return (
    <div className={`fixed z-10 h-20 w-full ${backgroundColor}`}>
      <Row justify="space-between" align="middle" className="h-20 w-full md:w-4/5 mx-auto px-4">
        {active && isMetamaskLoggedIn && isMobile && (
          <MenuUnfoldOutlined
            className="px-2 py-6 text-white text-base cursor-pointer float-left hover:text-white"
            onClick={onNavMenuClick}
          />
        )}

        <Logo />

        {active && isMetamaskLoggedIn && (
          <Menu
            theme={theme}
            mode="horizontal"
            defaultSelectedKeys={['/staking']}
            className="h-10 w-72 bg-white dark:bg-etny-primary-button-focus text-black dark:text-white border-2 border-gray-600 rounded-lg p-1"
          >
            {authRoutes.map((route, index) =>
              // eslint-disable-next-line no-nested-ternary
              route.visible && !route.welcome ? (
                index % 2 === 0 ? (
                  <Menu.Item
                    key={route.path || '/404'}
                    className="w-1/2 bg-[#3FA9FF] dark:bg-white leading-8 rounded-lg text-center"
                  >
                    <Link to={route.path || '/404'} className="h-1">
                      <Icon component={route.icon} className="font-bold text-lg" />
                      <span className="font-bold">{route.name}</span>
                    </Link>
                  </Menu.Item>
                ) : (
                  <Menu.Item key={route.path || '/404'} className="w-1/2 leading-8 rounded-lg text-center">
                    <Link to={route.path || '/404'} className="h-1">
                      <Icon component={route.icon} className="font-bold text-lg" />
                      <span className="font-bold">{route.name}</span>
                    </Link>
                  </Menu.Item>
                )
              ) : (
                <Fragment key={index} />
              )
            )}
          </Menu>
        )}

        <div className="flex justify-between items-center space-x-6">
          {theme === THEME_LIGHT && (
            <Button
              shape="circle"
              className="bg-etny-200  border-0
              dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus"
              onClick={onThemeChanged}
              icon={<FaMoon className="w-4 h-4 text-white dark:text-white pt-1" />}
            />
          )}

          {theme === THEME_DARK && (
            <Button
              shape="circle"
              className="bg-etny-200  border-0
              dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus"
              onClick={onThemeChanged}
              icon={<FaSun className="w-4 h-4 text-white dark:text-white pt-1" />}
            />
          )}

          {active && isMetamaskLoggedIn && (
            <Popover content={menu} trigger="click">
              <Badge count={99}>
                <Button
                  shape="circle"
                  className="bg-etny-200  border-0
                  dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus"
                  icon={<BellFilled className="text-white" />}
                />
              </Badge>
            </Popover>
          )}

          <MetaMaskButton />
        </div>
      </Row>
    </div>
  );
};

export default Navbar;

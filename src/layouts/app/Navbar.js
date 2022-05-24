import React, { Fragment } from 'react';
import Icon, { MenuUnfoldOutlined, EditOutlined, ClearOutlined, BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Col, Layout, List, Menu, Popover, Row, Tag } from 'antd';
import { useWeb3React } from '@web3-react/core';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import MetaMaskButton from '../../components/MetaMaskButton';
import useTheme from '../../hooks/useTheme';
import { randomIntFromInterval } from '../../utils/Math';
import { authRoutes } from '../../routes/routes';
import Logo from '../../components/Logo';
import useLocalStorage from '../../hooks/useLocalStorage';

const { Header } = Layout;

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
const tabList = [
  {
    key: 'tab1',
    tab: 'Notifications'
  },
  {
    key: 'tab2',
    tab: 'News'
  }
];
const menu = (
  <Card
    style={{ width: 320 }}
    tabList={tabList}
    actions={[<ClearOutlined key="setting" />, <EditOutlined key="edit" />]}
    bodyStyle={{ padding: 0 }}
  >
    <List
      className="max-h-80 overflow-auto"
      dataSource={data}
      renderItem={(item, i) => (
        <List.Item key={item.key || i} className="hover:bg-gray-100">
          <List.Item.Meta
            className="px-2"
            avatar={
              <Avatar src={`https://ui-avatars.com/api/?name=${randomIntFromInterval(0, 100)}&background=random`} />
            }
            title={item.title || 'New staking offer'}
            description={
              <Row>
                <Col span={12}>
                  <Tag color="gold">{item.description}</Tag>
                </Col>
                <Col span={12} className="font-bold text-right pr-1">
                  <span>1day ago</span>
                </Col>
              </Row>
            }
          />
        </List.Item>
      )}
    />
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

  return (
    <div className="fixed z-10 h-20 w-full bg-white dark:bg-etny-background">
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
            className="h-10 w-72 bg-[#FFFFFF] dark:bg-[#191C1F] text-black dark:text-white border-2 border-gray-600 rounded-lg p-1"
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
              style={{ boxShadow: 'inset 0px 0px 2px rgba(255, 255, 255, 0.23)' }}
              className="bg-[#F0F0F0] dark:bg-[#191C1F] border-0 hover:bg-gray-500"
              onClick={onThemeChanged}
              icon={<FaMoon className="w-4 h-4 text-black dark:text-white pt-1" />}
            />
          )}

          {theme === THEME_DARK && (
            <Button
              shape="circle"
              style={{ boxShadow: 'inset 0px 0px 2px rgba(255, 255, 255, 0.23)' }}
              className="bg-white dark:bg-[#191C1F] border-0 hover:bg-gray-500"
              onClick={onThemeChanged}
              icon={<FaSun className="w-4 h-4 text-black dark:text-white pt-1" />}
            />
          )}

          {active && isMetamaskLoggedIn && (
            <Popover content={menu} trigger="click">
              <Badge count={99}>
                <Button
                  shape="circle"
                  className="bg-[#0F0F0F] border-0 hover:bg-gray-500"
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

import React, { Fragment } from 'react';
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  LogoutOutlined,
  BellOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ClearOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Layout,
  List,
  Menu,
  Popover,
  Row,
  Space,
  Switch,
  Tabs,
  Tag
} from 'antd';
import { useWeb3React } from '@web3-react/core';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import MetaMaskButton from '../../components/MetaMaskButton';
import useTheme from '../../hooks/useTheme';
import { randomIntFromInterval } from '../../utils/Math';
import { authRoutes } from '../../routes/routes';

const { Header } = Layout;
const { TabPane } = Tabs;
const { Meta } = Card;

const leftIcon = (item) =>
  // eslint-disable-next-line no-nested-ternary
  item.avatar ? typeof item.avatar === 'string' ? <Avatar src={item.avatar} /> : <span>{item.avatar}</span> : null;

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
  // <Tabs defaultActiveKey="1" centered className="bg-white w-80 max-h-96 overflow-auto rounded-sm">
  //   <TabPane tab="Tab 1" key="1">
  //     <div>
  //       <List
  //         className="w-80 max-h-96 overflow-auto"
  //         width={320}
  //         bordered
  //         dataSource={data}
  //         renderItem={(item, i) => (
  //           <List.Item key={item.key || i}>
  //             <List.Item.Meta
  //               avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
  //               title="New staking offer"
  //               description={item.description}
  //             />
  //           </List.Item>
  //         )}
  //       />
  //       <div className="h-12">
  //         <Button>Clear</Button>
  //         <Button>Save</Button>
  //       </div>
  //     </div>
  //   </TabPane>
  //   <TabPane tab="Tab 2" key="2">
  //     Content of Tab Pane 2
  //   </TabPane>
  //   <TabPane tab="Tab 3" key="3">
  //     Content of Tab Pane 3
  //   </TabPane>
  // </Tabs>

  // <Menu>
  //   <Menu.Item icon={<LineChartOutlined />}>ETNY 300.13</Menu.Item>
  //   <Menu.Item icon={<UserOutlined />}>Account details</Menu.Item>
  //   <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
  // </Menu>
);

const Navbar = ({ onMenuClick }) => {
  const { isCollapsed, onToggleCollapse } = useCollapseDrawer();
  const { active } = useWeb3React();
  const { theme, onThemeChange } = useTheme();

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

  const onThemeChanged = (checked) => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (checked) {
      onThemeChange('dark');
    } else {
      onThemeChange('light');
    }
  };

  return (
    <Header className="fixed z-10 w-full px-2 bg-[#3FA9FF] dark:bg-gray-800 border-b-4 border-b-white">
      <div className="flex items-center justify-between">
        {active && isMobile && (
          <MenuUnfoldOutlined
            className="px-2 py-6 text-white text-base cursor-pointer float-left hover:text-white"
            onClick={onNavMenuClick}
          />
        )}

        {!active && (
          <div className="flex items-center justify-center float-left h-16">
            <svg
              className="hidden md:block"
              width={40}
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 110"
              xmlSpace="preserve"
            >
              <g>
                <path
                  id="main"
                  fill="#fff"
                  d="M200,46.3h-14.1c-1.3-4.1-4-9-7.7-12.9C166.6,21.7,147.7,22,136,33.7L84.2,86.1l0,0
		c-16,17.2-44.2,17.2-61.2,0.1l0.1,0.1C16.3,79.4,12.3,70.9,10.9,62H0V48.2h10.9c1.4-8.9,5.4-17.5,12.2-24.4l0,0
		c13.6-13.7,34-16.4,50.2-8.1l2.9-2.8l0,0c14.7-15.8,39.6-17,56.8-3.8c-4.3,2.3-8.3,5.4-11.9,8.9c-11.3-6.5-25.9-5-35.5,4.8
		l-10.7,11l0,0l0,0l0,0c-11.6-11.7-30.4-11.7-42,0c-4,4.1-6.7,9.1-7.9,14.4h29.6l0.1,13.8H25.1C26.3,67.2,29,72,33,76.2
		c11.6,11.7,30.5,11.7,42.1,0l51.8-52.4l0,0c16-17.1,44.2-17.3,61.2-0.2v-0.1C194.5,30.1,198.4,38.1,200,46.3z"
                />
                <path
                  id="accent"
                  fill="#fff"
                  d="M200,62.5c-1.6,9.4-5.5,16.8-12,23.3c-13.6,13.8-34,16.8-50.3,8.5l-2.9,2.8l0,0
		c-14.7,15.8-39.6,17-56.8,3.8c4.3-2.3,8.3-5.4,11.9-8.9c11.3,6.5,25.9,5,35.5-4.8l1.1-1.1l9.6-10c11.6,11.7,30.4,11.6,42-0.1v-0.2
		c3.7-3.7,6.3-8.1,7.6-13.5H200V62.5z"
                />
              </g>
            </svg>

            <span className="font-bebas-neue text-center text-xl font-bold text-white pl-2">Ethernity Cloud</span>
          </div>
        )}

        {active && (
          <div className="flex items-center justify-center float-left h-16 m-0">
            <svg
              className="hidden md:block"
              width={40}
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 110"
              xmlSpace="preserve"
            >
              <g>
                <path
                  id="main"
                  fill="#fff"
                  d="M200,46.3h-14.1c-1.3-4.1-4-9-7.7-12.9C166.6,21.7,147.7,22,136,33.7L84.2,86.1l0,0
		c-16,17.2-44.2,17.2-61.2,0.1l0.1,0.1C16.3,79.4,12.3,70.9,10.9,62H0V48.2h10.9c1.4-8.9,5.4-17.5,12.2-24.4l0,0
		c13.6-13.7,34-16.4,50.2-8.1l2.9-2.8l0,0c14.7-15.8,39.6-17,56.8-3.8c-4.3,2.3-8.3,5.4-11.9,8.9c-11.3-6.5-25.9-5-35.5,4.8
		l-10.7,11l0,0l0,0l0,0c-11.6-11.7-30.4-11.7-42,0c-4,4.1-6.7,9.1-7.9,14.4h29.6l0.1,13.8H25.1C26.3,67.2,29,72,33,76.2
		c11.6,11.7,30.5,11.7,42.1,0l51.8-52.4l0,0c16-17.1,44.2-17.3,61.2-0.2v-0.1C194.5,30.1,198.4,38.1,200,46.3z"
                />
                <path
                  id="accent"
                  fill="#fff"
                  d="M200,62.5c-1.6,9.4-5.5,16.8-12,23.3c-13.6,13.8-34,16.8-50.3,8.5l-2.9,2.8l0,0
		c-14.7,15.8-39.6,17-56.8,3.8c4.3-2.3,8.3-5.4,11.9-8.9c11.3,6.5,25.9,5,35.5-4.8l1.1-1.1l9.6-10c11.6,11.7,30.4,11.6,42-0.1v-0.2
		c3.7-3.7,6.3-8.1,7.6-13.5H200V62.5z"
                />
              </g>
            </svg>

            {!isCollapsed && (
              <span className="font-bebas-neue text-center text-xl font-bold text-white pl-2">Ethernity Cloud</span>
            )}
          </div>
        )}

        {/* {active && !isMobile && ( */}
        {/*  <MenuUnfoldOutlined */}
        {/*    className="px-2 py-6 text-white text-base cursor-pointer hover:text-white" */}
        {/*    onClick={onNavMenuClick} */}
        {/*  /> */}
        {/* )} */}

        {active && (
          <Menu
            theme={theme}
            mode="horizontal"
            defaultSelectedKeys={['2']}
            className="w-96 bg-[#3FA9FF] dark:bg-gray-800 text-black dark:text-white border-0"
          >
            {authRoutes.map((route, index) =>
              route.visible && !route.welcome ? (
                <Menu.Item key={route.path || '/404'} className="hover:bg-white focus:bg-white">
                  <Link to={route.path || '/404'}>
                    <Icon component={route.icon} className="text-white font-bold text-lg" />
                    <span className="text-white font-semibold">{route.name}</span>
                  </Link>
                </Menu.Item>
              ) : (
                <Fragment key={index} />
              )
            )}
          </Menu>
        )}

        <Space size="large">
          <Switch
            className="bg-[#0FB981]"
            checkedChildren={
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="py-1">
                <title />
                <path
                  d="M20.21,15.32A8.56,8.56,0,1,1,11.29,3.5a.5.5,0,0,1,.51.28.49.49,0,0,1-.09.57A6.46,6.46,0,0,0,9.8,9a6.57,6.57,0,0,0,9.71,5.72.52.52,0,0,1,.58.07A.52.52,0,0,1,20.21,15.32Z"
                  fill="#FFFFFF"
                />
              </svg>
            }
            unCheckedChildren={
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="py-1">
                <title />
                <circle cx="12" cy="12" fill="#FFFFFF" r="5" />
                <path d="M21,13H20a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z" fill="#FFFFFF" />
                <path d="M4,13H3a1,1,0,0,1,0-2H4a1,1,0,0,1,0,2Z" fill="#FFFFFF" />
                <path
                  d="M17.66,7.34A1,1,0,0,1,17,7.05a1,1,0,0,1,0-1.41l.71-.71a1,1,0,1,1,1.41,1.41l-.71.71A1,1,0,0,1,17.66,7.34Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M5.64,19.36a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.41L5.64,17a1,1,0,0,1,1.41,1.41l-.71.71A1,1,0,0,1,5.64,19.36Z"
                  fill="#FFFFFF"
                />
                <path d="M12,5a1,1,0,0,1-1-1V3a1,1,0,0,1,2,0V4A1,1,0,0,1,12,5Z" fill="#FFFFFF" />
                <path d="M12,22a1,1,0,0,1-1-1V20a1,1,0,0,1,2,0v1A1,1,0,0,1,12,22Z" fill="#FFFFFF" />
                <path
                  d="M6.34,7.34a1,1,0,0,1-.7-.29l-.71-.71A1,1,0,0,1,6.34,4.93l.71.71a1,1,0,0,1,0,1.41A1,1,0,0,1,6.34,7.34Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M18.36,19.36a1,1,0,0,1-.7-.29L17,18.36A1,1,0,0,1,18.36,17l.71.71a1,1,0,0,1,0,1.41A1,1,0,0,1,18.36,19.36Z"
                  fill="#FFFFFF"
                />
              </svg>
            }
            onChange={onThemeChanged}
            defaultChecked={theme === 'dark'}
          />
          {active && (
            <Popover content={menu} trigger="click" className="m-0 p-0">
              <Badge count={99}>
                <Button icon={<BellOutlined />} />
              </Badge>
            </Popover>

            // `1<Dropdown overlay={menu}>
            //   <Badge count={99}>
            //     <Button icon={<BellOutlined />} />
            //   </Badge>
            // </Dropdown>
          )}

          <MetaMaskButton />
        </Space>
      </div>
    </Header>
  );
};

export default Navbar;

import { useState } from 'react';
import { Button, Drawer, PageHeader, Space, Tabs } from 'antd';
import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import StakingForm from '../../components/staking/StakingForm';
import useTheme from '../../hooks/useTheme';
import AccountTab from '../../components/staking/tabs/AccountTab';
import StakingOffers from '../../components/staking/tabs/StakingOffers';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const { TabPane } = Tabs;

const StakingPage = () => {
  const [stakingDrawerVisible, setStakingDrawerVisible] = useState(false);
  const { theme, THEME_LIGHT } = useTheme();

  const onCreateStake = () => {
    setStakingDrawerVisible(true);
  };

  const onDrawerClosed = () => {
    setStakingDrawerVisible(false);
  };

  return (
    <Page title="Staking overview | ETNY" className="w-4/5 mx-auto my-4">
      {/* <HeaderBreadcrumbs links={[{ name: 'Staking Overview', href: '/staking' }]} /> */}
      <PageHeader
        title={
          <span className="uppercase text-black dark:text-white">
            <HomeOutlined className="text-black dark:text-white mr-2" />
            Staking Overview
          </span>
        }
        extra={[
          <Button key="3" className="uppercase font-semibold w-28">
            <Space>
              <FaArrowUp className="pt-1" />
              Send
            </Space>
          </Button>,
          <Button key="2" className="uppercase font-semibold w-28">
            <Space>
              <FaArrowDown className="pt-1" />
              Receive
            </Space>
          </Button>,
          <Button key="1" type="primary" className="uppercase font-semibold w-28" onClick={onCreateStake}>
            <Space>
              <FaCoins className="pt-1" />
              Stake
            </Space>
          </Button>
        ]}
        footer={
          <Tabs
            defaultActiveKey="1"
            className="text-black dark:text-white"
            // tabBarStyle={{ backgroundColor: '#191C1F', borderRadius: 8, border: '2px #26292C solid' }}
          >
            <TabPane
              tab={
                <span>
                  {/* <UserOutlined /> */}
                  Account
                </span>
              }
              key="1"
            >
              <AccountTab />
            </TabPane>
            <TabPane
              tab={
                <span>
                  {/* <ClockCircleOutlined /> */}
                  Pending
                </span>
              }
              key="2"
            >
              <StakingOffers status={StakingPotStatus.PENDING} onOpenDrawer={onCreateStake} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  {/* <CheckCircleOutlined /> */}
                  Approved
                </span>
              }
              key="3"
            >
              <StakingOffers status={StakingPotStatus.APPROVED} onOpenDrawer={onCreateStake} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  {/* <CloseCircleOutlined /> */}
                  Declined
                </span>
              }
              key="4"
            >
              <StakingOffers status={StakingPotStatus.DECLINED} onOpenDrawer={onCreateStake} />
            </TabPane>
          </Tabs>
        }
      />

      <Drawer
        title="Create new staking pot"
        width={420}
        destroyOnClose
        onClose={onDrawerClosed}
        visible={stakingDrawerVisible}
        bodyStyle={{
          backgroundColor: theme === THEME_LIGHT ? '#FFFFFF' : '#374151',
          paddingBottom: 80,
          border: 'none'
        }}
        headerStyle={{
          backgroundColor: theme === THEME_LIGHT ? '#3FA9FF' : '#1F2937',
          color: '#fff',
          height: 64,
          border: 'none'
        }}
        footerStyle={{
          backgroundColor: theme === THEME_LIGHT ? '#3FA9FF' : '#1F2937',
          color: '#fff',
          height: 64,
          border: 'none'
        }}
      >
        <StakingForm onClose={onDrawerClosed} />
      </Drawer>
    </Page>
  );
};
export default StakingPage;

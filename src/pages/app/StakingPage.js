import { useState } from 'react';
import { Button, Drawer, PageHeader, Space, Tabs } from 'antd';
import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { UserOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
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
    <Page title="Staking overview | ETNY" className="p-2">
      <HeaderBreadcrumbs links={[{ name: 'Staking Overview', href: '/staking' }]} />
      <PageHeader
        title={<span className="text-black dark:text-white">Staking Overview</span>}
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
          <Tabs defaultActiveKey="1" className="text-black dark:text-white">
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  ACCOUNT
                </span>
              }
              key="1"
            >
              <AccountTab />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ClockCircleOutlined />
                  PENDING
                </span>
              }
              key="2"
            >
              <StakingOffers status={StakingPotStatus.PENDING} onOpenDrawer={onCreateStake} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CheckCircleOutlined />
                  APPROVED
                </span>
              }
              key="3"
            >
              <StakingOffers status={StakingPotStatus.APPROVED} onOpenDrawer={onCreateStake} />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <CloseCircleOutlined />
                  DECLINED
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

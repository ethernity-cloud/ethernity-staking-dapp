import { useState } from 'react';
import { Button, Drawer, PageHeader, Space, Tabs } from 'antd';
import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HomeOutlined } from '@ant-design/icons';
import Page from '../../components/Page';
import StakingForm from '../../components/staking/StakingForm';
import useTheme from '../../hooks/useTheme';
import AccountTab from '../../components/staking/tabs/AccountTab';
import StakingOffers from '../../components/staking/tabs/StakingOffers';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const { TabPane } = Tabs;

const StakingPage = () => {
  const [stakingDrawerVisible, setStakingDrawerVisible] = useState(false);
  const { theme, THEME_LIGHT } = useTheme();
  const [updatingPending, setUpdatingPending] = useState(false);
  const [updatingApproved, setUpdatingApproved] = useState(false);
  const [updatingCanceled, setUpdatingCanceled] = useState(false);
  const [updatingDeclined, setUpdatingDeclined] = useState(false);

  const onCreateStake = () => {
    setStakingDrawerVisible(true);
  };

  const onDrawerClosed = () => {
    setStakingDrawerVisible(false);
  };

  const onStakingTabChanged = (activeKey) => {
    // eslint-disable-next-line default-case
    switch (parseInt(activeKey, 10)) {
      case 2:
        setUpdatingPending(true);
        break;
      case 3:
        setUpdatingApproved(true);
        break;
      case 4:
        setUpdatingCanceled(true);
        break;
      case 5:
        setUpdatingDeclined(true);
        break;
    }
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
          <Button
            key="3"
            className="bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                        text-white hover:text-white focus:text-white
                        border-0 rounded-lg
                        uppercase font-semibold w-28"
          >
            <Space>
              <FaArrowUp className="pt-1" />
              Send
            </Space>
          </Button>,
          <Button
            key="2"
            className="bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                  text-white hover:text-white focus:text-white
                  border-0 rounded-lg
                  uppercase font-semibold w-28"
          >
            <Space>
              <FaArrowDown className="pt-1" />
              Receive
            </Space>
          </Button>,
          <Button
            key="1"
            type="primary"
            className="uppercase font-semibold w-28
                bg-white hover:bg-etny-secondary-button-hover focus:bg-etny-secondary-button-focus
                text-etny-orange-500 hover:text-etny-orange-500 focus:text-etny-orange-500
                border-2 border-primary hover:border-primary dark:border-0 rounded-md"
            onClick={onCreateStake}
          >
            <Space>
              <FaCoins className="pt-1" />
              Stake
            </Space>
          </Button>
        ]}
        footer={
          <Tabs
            defaultActiveKey="1"
            className="etny-tabs dark:etny-tabs text-black dark:text-white"
            onChange={onStakingTabChanged}
          >
            <TabPane tab={<span>Account</span>} key="1">
              <AccountTab />
            </TabPane>
            <TabPane tab={<span>Pending</span>} key="2">
              <StakingOffers
                status={StakingPotStatus.PENDING}
                onOpenDrawer={onCreateStake}
                onUpdateFinished={() => setUpdatingPending(false)}
                updating={updatingPending}
              />
            </TabPane>
            <TabPane tab={<span>Approved</span>} key="3">
              <StakingOffers
                status={StakingPotStatus.APPROVED}
                onOpenDrawer={onCreateStake}
                onUpdateFinished={() => setUpdatingApproved(false)}
                updating={updatingApproved}
              />
            </TabPane>
            <TabPane tab={<span>Canceled</span>} key="4">
              <StakingOffers
                status={StakingPotStatus.CANCELED}
                onOpenDrawer={onCreateStake}
                onUpdateFinished={() => setUpdatingCanceled(false)}
                updating={updatingCanceled}
              />
            </TabPane>
            <TabPane tab={<span>Declined</span>} key="5">
              <StakingOffers
                status={StakingPotStatus.DECLINED}
                onOpenDrawer={onCreateStake}
                onUpdateFinished={() => setUpdatingDeclined(false)}
                updating={updatingDeclined}
              />
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
          backgroundColor: theme === THEME_LIGHT ? '#FFFFFF' : '#070E1D',
          paddingBottom: 80
        }}
        headerStyle={{
          backgroundColor: theme === THEME_LIGHT ? '#3FA9FF' : '#030363',
          color: '#fff',
          height: 64,
          border: 'none'
        }}
        footerStyle={{
          backgroundColor: theme === THEME_LIGHT ? '#3FA9FF' : '#030363',
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

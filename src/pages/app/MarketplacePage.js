import { useState } from 'react';
import { Button, DatePicker, PageHeader, Space, Tabs } from 'antd';
import { ReloadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Page from '../../components/Page';
import StakingOffers from '../../components/staking/tabs/StakingOffers';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const { RangePicker } = DatePicker;

const MarketplacePage = () => {
  const [stakingDrawerVisible, setStakingDrawerVisible] = useState(false);

  const onCreateStake = () => {
    setStakingDrawerVisible(true);
  };

  const onDrawerClosed = () => {
    setStakingDrawerVisible(false);
  };

  return (
    <Page title="Marketplace | ETNY" className="w-4/5 mx-auto my-4">
      {/* <HeaderBreadcrumbs links={[{ name: 'Marketplace', href: '/staking' }]} /> */}
      <PageHeader
        title={
          <span className="uppercase text-black dark:text-white">
            <ShoppingCartOutlined className="text-black dark:text-white mr-2" />
            Marketplace Overview
          </span>
        }
        extra={[
          <RangePicker key="1" />,
          <Button key="2" type="primary" onClick={onCreateStake}>
            <Space>
              <ReloadOutlined />
              Refresh
            </Space>
          </Button>
        ]}
        footer={<StakingOffers status={StakingPotStatus.PENDING} isMarketplace />}
      />
    </Page>
  );
};
export default MarketplacePage;

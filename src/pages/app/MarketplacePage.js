import { useState } from 'react';
import { Button, DatePicker, PageHeader, Select, Space, Tabs } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
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
    <Page title="Marketplace | ETNY" className="bg-gray-50 p-2 h-full">
      <HeaderBreadcrumbs links={[{ name: 'Marketplace', href: '/staking' }]} />
      <PageHeader
        title={<span className="text-black dark:text-white">Marketplace Overview</span>}
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

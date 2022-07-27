import React, { useState } from 'react';
import { Button, DatePicker, PageHeader, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { IoBagCheckSharp, IoReloadSharp } from 'react-icons/io5';
import Page from '../../components/Page';
import StakingOffers from '../../components/staking/tabs/StakingOffers';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const { RangePicker } = DatePicker;

const MarketplacePage = () => {
  const [updatingPending, setUpdatingPending] = useState(false);

  const onHandleRefresh = () => {
    setUpdatingPending(true);
  };

  return (
    <Page title="Marketplace | ETNY" className="w-4/5 mx-auto my-4">
      {/* <HeaderBreadcrumbs links={[{ name: 'Marketplace', href: '/staking' }]} /> */}
      <PageHeader
        title={
          <span className="uppercase text-black dark:text-white">
            <IoBagCheckSharp className="text-black dark:text-white mr-2" />
            Marketplace Overview
          </span>
        }
        extra={[
          // <RangePicker key="1" />,
          <Button
            key="2"
            type="primary"
            size="large"
            className="bg-etny-primary-light-button-primary hover:bg-etny-primary-light-button-hover focus:bg-etny-primary-light-button-focus
                        dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus
                        text-white hover:text-white focus:text-white
                        border-0 rounded-md
                        uppercase font-semibold w-36"
            onClick={onHandleRefresh}
          >
            <Space>
              Refresh
              <ReloadOutlined />
            </Space>
          </Button>
        ]}
        footer={
          <StakingOffers
            status={StakingPotStatus.PENDING}
            isMarketplace
            hasProgressBar={false}
            hasStatisticsDetails
            onUpdateFinished={() => setUpdatingPending(false)}
            updating={updatingPending}
          />
        }
      />
    </Page>
  );
};
export default MarketplacePage;

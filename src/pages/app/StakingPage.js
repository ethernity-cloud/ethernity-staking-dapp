import React, { useState } from 'react';
import { Button, Col, Drawer, Modal, PageHeader, Row, Space, Tabs, Tooltip } from 'antd';
import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useWeb3React } from '@web3-react/core';
import { CloseOutlined, HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoHomeSharp, IoArrowDown, IoLayers, IoArrowDownCircle } from 'react-icons/io5';
import Page from '../../components/Page';
import StakingForm from '../../components/staking/StakingForm';
import useTheme from '../../hooks/useTheme';
import AccountTab from '../../components/staking/tabs/AccountTab';
import StakingOffers from '../../components/staking/tabs/StakingOffers';
import { StakingPotStatus } from '../../utils/StakingPotStatus';
import EtnyQRCode from '../../components/EtnyQRCode';

const { TabPane } = Tabs;

const StakingPage = () => {
  const [stakingDrawerVisible, setStakingDrawerVisible] = useState(false);
  const { theme, THEME_LIGHT } = useTheme();
  const { account } = useWeb3React();
  const [updatingPending, setUpdatingPending] = useState(false);
  const [updatingApproved, setUpdatingApproved] = useState(false);
  const [updatingCanceled, setUpdatingCanceled] = useState(false);
  const [updatingDeclined, setUpdatingDeclined] = useState(false);

  const [activeTab, setActiveTab] = useState('1');

  const onHandleRefresh = () => {
    console.log(activeTab);
    // eslint-disable-next-line default-case
    switch (parseInt(activeTab, 10)) {
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

  const onCreateStake = () => {
    setStakingDrawerVisible(true);
  };

  const onDrawerClosed = () => {
    setStakingDrawerVisible(false);
  };

  const onStakingTabChanged = (activeKey) => {
    setActiveTab(activeKey);
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

  const onCopyWalletAddress = async () => {
    // notification.success({
    //   placement: 'bottomRight',
    //   className: 'bg-white dark:bg-black text-black dark:text-white',
    //   message: <span className="text-black dark:text-white">MetaMask</span>,
    //   description: 'Successfully copied wallet address'
    // });
  };

  const handleReceive = () => {
    Modal.confirm({
      title: (
        <Row justify="center">
          <span className="text-center text-xl">RECEIVE</span>
        </Row>
      ),
      icon: null,
      width: 520,
      closable: true,
      closeIcon: <CloseOutlined style={{ color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF' }} />,
      maskClosable: true,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <Col>
          <Row justify="center">
            <EtnyQRCode size={220} account={account} />{' '}
          </Row>
          <Row justify="center" className="w-full">
            <span className="px-2 text-success">{account}</span>
          </Row>
          <Row justify="center">
            <CopyToClipboard text={account} onCopy={onCopyWalletAddress()}>
              <Tooltip title="Copy Wallet Address">
                <Button
                  size="large"
                  type="primary"
                  className="w-full bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                  text-white hover:text-white focus:text-white
                  border-0 rounded-sm mt-4"
                  onClick={onCopyWalletAddress}
                >
                  Copy Wallet Address
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </Row>
        </Col>
      ),
      okButtonProps: { style: { display: 'none' } },
      cancelButtonProps: { style: { display: 'none' } }
    });
  };
  return (
    <Page title="Staking overview | ETNY" className="w-4/5 mx-auto my-4">
      {/* <HeaderBreadcrumbs links={[{ name: 'Staking Overview', href: '/staking' }]} /> */}
      <PageHeader
        title={
          <span className="uppercase text-black dark:text-white">
            <IoHomeSharp className="text-black dark:text-white mr-2" />
            Staking Overview
          </span>
        }
        extra={[
          // <Button
          //   key="4"
          //   size="large"
          //   className="bg-etny-primary-light-button-primary hover:bg-etny-primary-light-button-hover focus:bg-etny-primary-light-button-focus
          //               dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus
          //               text-white hover:text-white focus:text-white
          //               border-0 rounded-md
          //               uppercase font-semibold w-36"
          // >
          //   <Space>
          //     Send
          //     <FaArrowUp className="pt-1" />
          //   </Space>
          // </Button>,
          <Button
            key="3"
            size="large"
            className="bg-etny-primary-light-button-primary hover:bg-etny-primary-light-button-hover focus:bg-etny-primary-light-button-focus
                        dark:bg-etny-primary-button-primary dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus
                        text-white hover:text-white focus:text-white
                        border-0 rounded-md
                        uppercase font-semibold w-36"
            onClick={handleReceive}
          >
            <Space>
              Receive
              <IoArrowDown className="mt-1" />
            </Space>
          </Button>,
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
          </Button>,
          <Button
            key="1"
            type="primary"
            size="large"
            className="bg-white hover:bg-etny-primary-light-button-hover focus:bg-etny-primary-light-button-focus
                dark:bg-white dark:hover:bg-etny-primary-button-hover dark:focus:bg-etny-primary-button-focus
                text-etny-200 hover:text-white focus:text-white
                dark:text-black dark:hover:text-white dark:focus:text-white
                border-2 border-etny-200
                dark:border-0
                rounded-md
                uppercase font-semibold w-36"
            onClick={onCreateStake}
          >
            <Space>
              New Stake
              <IoLayers className="mt-1" />
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
        width={520}
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

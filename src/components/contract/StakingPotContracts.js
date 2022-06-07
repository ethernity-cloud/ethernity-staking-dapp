import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Empty, Form, Input, Modal, notification, Row, Spin, Tooltip } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import MarketplaceOfferCardV1 from '../marketplace/MarketplaceOfferCardV1';
import { formatNumber } from '../../utils/numberFormatter';
import StakingStatusTag from '../staking/StakingStatusTag';
import { formatDate, getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../utils/StakingPotCalculator';
import EtnyStakingContract from '../../operations/etnyStakingContract';

const StakingPotContracts = ({ status, contracts }) => {
  const { account, library } = useWeb3React();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    // The "any" network will allow spontaneous network changes
    const provider = etnyStakingContract.getProvider();
    provider.on('accountsChanged', onAccountChanged);

    return () => {
      provider.removeAllListeners('accountsChanged');
    };
  }, []);

  const onAccountChanged = async (accounts) => {
    console.log('accountChanged');
    // if (accounts.length === 1) await initialize();
  };

  const onApproveFormSubmited = async (values) => {
    await etnyStakingContract.approveBaseStakeRequest(currentSelected, values.rewardAddress);
    notification.success({
      placement: 'bottomRight',
      className: 'bg-white dark:bg-black text-black dark:text-white',
      message: <span className="text-black dark:text-white">Ethernity</span>,
      description: `Offer for staking pot ${currentSelected + 1} has been approved.`
    });
  };

  const onApprove = (stakingPot) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>{`Are you sure you want to approve the offer for the staking pot ${stakingPot.id + 1}?`}</p>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              rewardAddress: account
            }}
            onFinish={onApproveFormSubmited}
          >
            <Form.Item
              name="rewardAddress"
              label={<span className="text-black dark:text-white">Reward wallet address</span>}
              rules={[{ required: true, message: 'Please enter the reward wallet address' }]}
            >
              <Input
                className="w-full input-calculator dark:input-calculator"
                addonAfter={
                  <Tooltip title="Copy reward wallet address">
                    <CopyOutlined
                      onClick={() =>
                        notification.success({
                          placement: 'bottomRight',
                          message: `Ethernity`,
                          description: `Wallet address has been copied.`
                        })
                      }
                    />
                  </Tooltip>
                }
                placeholder="Reward account address"
              />
            </Form.Item>
          </Form>
        </>
      ),
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        setCurrentSelected(stakingPot.id);
        form.submit();
      }
    });
  };

  const onDecline = (stakingPot) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to decline the offer for the staking pot ${stakingPot.id + 1}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        // if (stakingPot.type === StakingRequestType.BASE) {
        //   await etnyStakingContract.declineBaseStakeRequest(stakingPot.id);
        // } else {
        //   await etnyStakingContract.declineExtendedStakeRequest(stakingPot.id);
        // }
        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Offer for staking pot ${stakingPot.id + 1} has been declined.`
        });
      }
    });
  };

  const onCancel = (stakingPot) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to cancel the offer for the staking pot ${stakingPot.id + 1}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        // if (stakingPot.type === StakingRequestType.BASE) {
        //   await etnyStakingContract.cancelBaseStakeRequest(stakingPot.id);
        // } else {
        //   await etnyStakingContract.cancelExtendedStakeRequest(stakingPot.id);
        // }
        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Offer for staking pot ${stakingPot.id + 1} has been canceled.`
        });
      }
    });
  };

  const filteredByStatusStakes = contracts.filter((stake) => stake.status === status);
  if (filteredByStatusStakes.length === 0) {
    return (
      <Empty
        className="mt-10"
        image="/static/icons/remove.png"
        imageStyle={{
          height: 120
        }}
        description={
          <span className="text-lg my-4 text-black dark:text-white">
            There are no available contracts with status <StakingStatusTag status={status} />
          </span>
        }
      />
    );
  }

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (isLoading) {
    return (
      <Row className="w-full mt-20" justify="center" align="middle">
        <Spin indicator={antIcon} />
      </Row>
    );
  }

  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="py-4 antFadeIn">
          <Row justify="start" gutter={[16, 16]}>
            {filteredByStatusStakes.map((contract, index) => (
              <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
                <MarketplaceOfferCardV1
                  loading={isLoading}
                  isContract
                  isMarketplace={false}
                  hasIcon={false}
                  hasProgressBar={false}
                  hasStatisticsDetails={false}
                  nodeAddress={contract.nodeAddress}
                  stakeHolderAddress={contract.stakeHolderAddress}
                  title={`Staking Request 000${contract.id + 1}`}
                  type={contract.type}
                  status={contract.status}
                  subtitle={formatDate(contract.timestamp)}
                  // description="Some short description that needs to be added"
                  secondaryLeftValue={getRatePerYear(contract.timestamp)}
                  secondaryLeftValueSuffix="%"
                  secondaryLeftLabel="APR FIRST YEAR"
                  secondaryRightValue={contract.period}
                  secondaryRightValueSuffix="M"
                  secondaryRightLabel="maturity period"
                  mainLeftLabel="REWARD SPLIT"
                  mainLeftValue={contract.split || 100}
                  mainLeftUnit="%"
                  mainLeftValueSuffix="FOR OPER."
                  mainRightLabel="AMOUNT"
                  mainRightValue={formatNumber(contract.amount)}
                  mainRightUnit=""
                  mainRightValueSuffix="ETNY"
                  pendingCountLabel="PENDING"
                  pendingCount={contract.pendingContracts}
                  approvedCountLabel="APPROVED"
                  approvedCount={contract.approvedContracts}
                  declinedCountLabel="DECLINED"
                  declinedCount={contract.declinedContracts}
                  percent={getPercentOfDaysUntil(contract.timestamp, contract.period)}
                  percentValue={getDaysUntil(contract.timestamp, contract.period)}
                  percentLabel="Time till maturity"
                  percentLabelSuffix="days"
                  onApprove={() => onApprove(contract)}
                  onDecline={() => onDecline(contract)}
                  onCancel={() => onCancel(contract)}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

StakingPotContracts.propTypes = {
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  contracts: PropTypes.array
};

export default StakingPotContracts;

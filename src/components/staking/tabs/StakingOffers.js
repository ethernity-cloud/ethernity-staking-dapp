import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Empty, Form, Input, InputNumber, Modal, notification, Row, Spin, Tooltip } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import MarketplaceOfferCardV1 from '../../marketplace/MarketplaceOfferCardV1';
import { formatNumber } from '../../../utils/numberFormatter';
import StakingStatusTag from '../StakingStatusTag';
import { getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../../utils/StakingPotCalculator';
import EtnyStakingContract from '../../../operations/etnyStakingContract';
import { StakingRequestType } from '../../../utils/StakingRequestType';

const StakingOffers = ({
  status,
  updating,
  onOpenDrawer,
  onUpdateFinished,
  isMarketplace,
  hasProgressBar,
  hasStatisticsDetails
}) => {
  const { account, library } = useWeb3React();
  const navigate = useNavigate();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [isLoading, setIsLoading] = useState(false);
  const [stakes, setStakes] = useState([]);
  const [form] = Form.useForm();
  const [applyForm] = Form.useForm();

  let currentSelected = null;

  const getBaseStakesFilteredByStatus = async (status) => {
    const totalBaseStakes = await etnyStakingContract.getBaseStakeRequestTotal();
    const totalExtendedStakes = await etnyStakingContract.getExtendedStakeRequestTotal();
    const promises = [];
    const extendedStatsPromises = [];
    for (let i = 0; i < totalBaseStakes; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      promises.push(await etnyStakingContract.getBaseStake(i));
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < totalExtendedStakes; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      promises.push(await etnyStakingContract.getExtendedStake(i));

      if (isMarketplace) {
        // eslint-disable-next-line no-await-in-loop
        extendedStatsPromises.push(await etnyStakingContract.getExtendedStakeRequestContractStats(i));
      }
    }

    const results = await Promise.all(promises);

    if (isMarketplace) {
      const extendedStatsResults = await Promise.all(extendedStatsPromises);
      console.log(extendedStatsResults);
      const aggregatedResults = results
        .filter((item) => item.type === StakingRequestType.EXTENDED)
        .map((item) => {
          const stats = extendedStatsResults.find((stat) => item.id === stat.id);
          item.total = stats.total;
          item.approvedContracts = stats.approvedContracts;
          item.canceledContracts = stats.canceledContracts;
          item.declinedContracts = stats.declinedContracts;
          item.pendingContracts = stats.pendingContracts;
          item.terminatedContracts = stats.terminatedContracts;
          return item;
        });

      // console.log(aggregatedResults);
      return aggregatedResults.filter((item) => item.status === status && item.type === StakingRequestType.EXTENDED);
    }

    return results.filter(
      (item) => item.status === status && (item.nodeAddress === account || item.stakeHolderAddress === account)
    );
  };

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
    if (accounts.length === 1) await initialize();
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (updating) {
      // console.log('loading staking pots');
      initialize();
      onUpdateFinished();
    }
  }, [updating]);

  const initialize = async () => {
    setIsLoading(true);
    const filtered = await getBaseStakesFilteredByStatus(status);
    setStakes(filtered);
    setIsLoading(false);
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

  const onApplyFormSubmited = async (values) => {
    console.log(values);
    await etnyStakingContract.applyExtendedStakeRequest(currentSelected, values.amount, values.rewardAddress);
    notification.success({
      placement: 'bottomRight',
      className: 'bg-white dark:bg-black text-black dark:text-white',
      message: <span className="text-black dark:text-white">Ethernity</span>,
      description: `Application for the offer ${currentSelected + 1} has been submited.`
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
        currentSelected = stakingPot.id;
        form.submit();
      }
    });
  };

  const onApply = (stakingPot) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>{`Are you sure you want to apply for the offer ${stakingPot.id + 1}?`}</p>
          <Form
            form={applyForm}
            layout="vertical"
            requiredMark
            initialValues={{
              rewardAddress: account
            }}
            onFinish={onApplyFormSubmited}
          >
            <Form.Item
              name="amount"
              label={<span className="text-black dark:text-white">Staking amount (ETNY)</span>}
              rules={[{ required: true, message: 'Please enter amount for staking' }]}
            >
              <InputNumber
                placeholder="Staking amount"
                step="10"
                className="w-full dark:input-number-calculator"
                min={0}
                max={stakingPot.amount}
              />
            </Form.Item>

            <Form.Item
              name="nodeAddress"
              label={<span className="text-black dark:text-white">Node wallet address</span>}
              rules={[{ required: true, message: 'Please enter the node wallet address' }]}
            >
              <Input
                className="w-full input-calculator dark:input-calculator"
                addonAfter={
                  <Tooltip title="Copy node wallet address">
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
                placeholder="Node wallet address"
              />
            </Form.Item>

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
      okText: 'Submit offer',
      cancelText: 'Cancel',
      onOk: () => {
        currentSelected = stakingPot.id;
        applyForm.submit();
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
        if (stakingPot.type === StakingRequestType.BASE) {
          await etnyStakingContract.declineBaseStakeRequest(stakingPot.id);
        } else {
          await etnyStakingContract.declineExtendedStakeRequest(stakingPot.id);
        }
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
        if (stakingPot.type === StakingRequestType.BASE) {
          await etnyStakingContract.cancelBaseStakeRequest(stakingPot.id);
        } else {
          await etnyStakingContract.cancelExtendedStakeRequest(stakingPot.id);
        }
        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Offer for staking pot ${stakingPot.id + 1} has been canceled.`
        });
      }
    });
  };

  const onDetails = (stakingPot) => {
    navigate(`/staking/${stakingPot.id + 1}`);
  };

  const onWithdraw = () => {};

  const filteredByStatusStakes = stakes.filter((stake) => stake.status === status);
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
            There are no available staking pots with status <StakingStatusTag status={status} />
          </span>
        }
      >
        {!isMarketplace && (
          <Button type="primary" onClick={onOpenDrawer}>
            Create new staking pot
          </Button>
        )}
      </Empty>
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
            {filteredByStatusStakes.map((stake, index) => (
              <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
                <MarketplaceOfferCardV1
                  loading={isLoading}
                  isMarketplace={isMarketplace}
                  hasProgressBar={hasProgressBar}
                  hasStatisticsDetails={hasStatisticsDetails}
                  nodeAddress={stake.nodeAddress}
                  stakeHolderAddress={stake.stakeHolderAddress}
                  title={isMarketplace ? `Offer 000${stake.id + 1}` : `Staking pot 000${stake.id + 1}`}
                  type={stake.type}
                  status={stake.status}
                  subtitle={stake.type}
                  // description="Some short description that needs to be added"
                  secondaryLeftValue={getRatePerYear(stake.timestamp)}
                  secondaryLeftValueSuffix="%"
                  secondaryLeftLabel="APR FIRST YEAR"
                  secondaryRightValue={stake.period}
                  secondaryRightValueSuffix="M"
                  secondaryRightLabel="maturity period"
                  mainLeftLabel="REWARD SPLIT"
                  mainLeftValue={stake.split || 100}
                  mainLeftUnit="%"
                  mainLeftValueSuffix="FOR OPER."
                  mainRightLabel="AMOUNT"
                  mainRightValue={formatNumber(stake.amount)}
                  mainRightUnit=""
                  mainRightValueSuffix="ETNY"
                  pendingCountLabel="PENDING"
                  pendingCount={stake.pendingContracts}
                  approvedCountLabel="APPROVED"
                  approvedCount={stake.approvedContracts}
                  declinedCountLabel="DECLINED"
                  declinedCount={stake.declinedContracts}
                  percent={getPercentOfDaysUntil(stake.timestamp, stake.period)}
                  percentValue={getDaysUntil(stake.timestamp, stake.period)}
                  percentLabel="Time till maturity"
                  percentLabelSuffix="days"
                  onApprove={() => onApprove(stake)}
                  onApply={() => onApply(stake)}
                  onDecline={() => onDecline(stake)}
                  onCancel={() => onCancel(stake)}
                  onDetails={() => onDetails(stake)}
                  onWithdraw={onWithdraw}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

StakingOffers.propTypes = {
  // status: PropTypes.oneOf([0, 1, 2, 3]),
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  updating: PropTypes.bool,
  onOpenDrawer: PropTypes.func,
  onUpdateFinished: PropTypes.func,
  isMarketplace: PropTypes.bool,
  hasProgressBar: PropTypes.bool,
  hasStatisticsDetails: PropTypes.bool
};

export default StakingOffers;

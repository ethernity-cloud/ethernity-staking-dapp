import { Button, Col, Empty, Form, Input, Modal, notification, Row, Spin, Tooltip } from 'antd';
import { CopyOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import MarketplaceOfferCardV1 from '../../marketplace/MarketplaceOfferCardV1';
import { formatNumber } from '../../../utils/numberFormatter';
import StakingStatusTag from '../StakingStatusTag';
import { getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../../utils/StakingPotCalculator';
import EtnyStakingContract from '../../../operations/etnyStakingContract';
import { StakingRequestType } from '../../../utils/StakingRequestType';

const StakingOffers = ({ status, updating, onOpenDrawer, onUpdateFinished, isMarketplace }) => {
  const { account, library } = useWeb3React();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [isLoading, setIsLoading] = useState(false);
  const [stakes, setStakes] = useState([]);
  const [form] = Form.useForm();
  const [currentSelected, setCurrentSelected] = useState(null);

  const getBaseStakesFilteredByStatus = async (status) => {
    const totalBaseStakes = await etnyStakingContract.getBaseStakeRequestTotal();
    const promises = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < totalBaseStakes; i++) {
      // eslint-disable-next-line no-await-in-loop
      promises.push(await etnyStakingContract.getBaseStake(i));
    }

    const results = await Promise.all(promises);
    // console.log(results);
    const parsedResults = results.map((item) => ({
      nodeAddress: item.nodeAddress,
      stakeHolderAddress: item.stakeHolderAddress,
      amount: item.amount.toNumber(),
      period: item.period.toNumber(),
      status: item.status,
      // timestamp received is in seconds, so we have to convert it to milliseconds
      timestamp: item.timestamp.toNumber() * 1000,
      type: StakingRequestType.BASE,
      id: item._baseStakeId.toNumber()
    }));
    // console.log(parsedResults);

    return parsedResults.filter(
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

  const onApprove = (id) => {
    notification.success({
      placement: 'bottomRight',
      message: `Ethernity`,
      description: `Offer for staking pot ${id + 1} has been rejected.`
    });
    console.log('hellllo');
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>Are you sure you want to approve the offer for the staking pot ${id + 1}?</p>
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
      onOk: async () => {
        setCurrentSelected(id);
        form.submit();
      }
    });
  };

  const onDecline = (id) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to decline the offer for the staking pot ${id + 1}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await etnyStakingContract.declineBaseStakeRequest(id);
        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Offer for staking pot ${id + 1} has been declined.`
        });
      }
    });
  };

  const onCancel = (id) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to cancel the offer for the staking pot ${id + 1}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await etnyStakingContract.cancelBaseStakeRequest(id);
        notification.success({
          placement: 'bottomRight',
          message: `Ethernity`,
          description: `Offer for staking pot ${id + 1} has been canceled.`
        });
      }
    });
  };

  const onDetails = (id) => {
    notification.success({
      placement: 'bottomRight',
      message: `Ethernity`,
      description: `Offer for staking pot ${id + 1} has been rejected.`
    });
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
  if (isLoading)
    return (
      <Row className="w-full mt-20" justify="center" align="middle">
        <Spin indicator={antIcon} />
      </Row>
    );

  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="py-4 antFadeIn">
          <Row justify="start" gutter={[16, 16]}>
            {filteredByStatusStakes.map((stake, index) => (
              <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
                <MarketplaceOfferCardV1
                  loading={isLoading}
                  nodeAddress={stake.nodeAddress}
                  stakeHolderAddress={stake.stakeHolderAddress}
                  isMarketplace={isMarketplace}
                  title={`Staking pot 000${stake.id + 1}`}
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
                  mainLeftValueSuffix="OPER."
                  mainRightLabel="AMOUNT"
                  mainRightValue={formatNumber(stake.amount)}
                  mainRightUnit=""
                  mainRightValueSuffix="ETNY"
                  percent={getPercentOfDaysUntil(stake.timestamp, stake.period)}
                  percentValue={getDaysUntil(stake.timestamp, stake.period)}
                  percentLabel="Time till maturity"
                  percentLabelSuffix="days"
                  onApprove={() => onApprove(stake.id)}
                  onDecline={() => onDecline(stake.id)}
                  onCancel={() => onCancel(stake.id)}
                  onDetails={() => onDetails(stake.id)}
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
  isMarketplace: PropTypes.bool
};

export default StakingOffers;

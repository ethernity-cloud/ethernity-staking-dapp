import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Pagination,
  Row,
  Spin,
  Tooltip
} from 'antd';
import { CopyOutlined, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';
import MarketplaceOfferCardV1 from '../../marketplace/MarketplaceOfferCardV1';
import { formatNumber } from '../../../utils/numberFormatter';
import StakingStatusTag from '../StakingStatusTag';
import { getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../../utils/StakingPotCalculator';
import EtnyStakingContract from '../../../operations/etnyStakingContract';
import { StakingRequestType } from '../../../utils/StakingRequestType';
import { parseExceptionReason } from '../../../utils/parsing';

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
  const [isLoading, setIsLoading] = useState(true);
  const [stakes, setStakes] = useState([]);
  const [filteredByStatusStakes, setFilteredByStatusStakes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setCurrentRowsPerPage] = useState(8);
  const [form] = Form.useForm();
  const [applyForm] = Form.useForm();

  let currentSelected = null;

  useEffect(() => {
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
      initialize();
      onUpdateFinished();
    }
  }, [updating]);

  const getBaseStakesFilteredByStatus = async (status) => {
    setIsLoading(true);

    const totalBaseStakes = await etnyStakingContract.getBaseStakeRequestTotal();
    const totalExtendedStakes = await etnyStakingContract.getExtendedStakeRequestTotal();
    const promises = [];
    const extendedStatsPromises = [];
    if (!isMarketplace) {
      for (let i = 0; i < totalBaseStakes; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        promises.push(await etnyStakingContract.getBaseStake(i));
      }
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
      // console.log(extendedStatsResults);
      const aggregatedResults = results
        .filter((item) => item.type === StakingRequestType.EXTENDED)
        .map((item) => {
          const stats = extendedStatsResults.find((stat) => item.id === stat.id);
          console.log(stats);
          item.total = stats.total;
          item.approvedContracts = stats.approvedContracts;
          item.canceledContracts = stats.canceledContracts;
          item.declinedContracts = stats.declinedContracts;
          item.pendingContracts = stats.pendingContracts;
          item.terminatedContracts = stats.terminatedContracts;
          return item;
        });

      return aggregatedResults.filter((item) => item.status === status && item.type === StakingRequestType.EXTENDED);
    }

    return results.filter(
      (item) => item.status === status && (item.nodeAddress === account || item.stakeHolderAddress === account)
    );
  };

  const initialize = async () => {
    const filtered = await getBaseStakesFilteredByStatus(status);
    setStakes(filtered);
    setIsLoading(false);
  };

  const onApproveFormSubmitted = async (values) => {
    try {
      await etnyStakingContract.approveBaseStakeRequest(currentSelected, values.rewardAddress);
      notification.success({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">Ethernity</span>,
        description: `Offer for staking pot ${currentSelected + 1} has been approved.`
      });
    } catch (e) {
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">Ethernity</span>,
        description: parseExceptionReason(e.reason)
      });
    }
  };

  const onApplyFormSubmitted = async (values) => {
    try {
      await etnyStakingContract.applyExtendedStakeRequest(currentSelected, values.amount, values.rewardAddress);
      notification.success({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">Ethernity</span>,
        description: `Application for the offer ${currentSelected + 1} has been submited.`
      });
    } catch (e) {
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">Ethernity</span>,
        description: parseExceptionReason(e.reason)
      });
    }
  };

  const onApprove = (stakingPot) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
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
            onFinish={onApproveFormSubmitted}
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
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: () => {
        currentSelected = stakingPot.id;
        form.submit();
      }
    });
  };

  const onApply = (stakingPot) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>{`Are you sure you want to apply for the offer ${stakingPot.id + 1}?`}</p>
          <Form
            form={applyForm}
            layout="vertical"
            requiredMark
            initialValues={{
              nodeAddress: account,
              rewardAddress: account
            }}
            onFinish={onApplyFormSubmitted}
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
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: () => {
        currentSelected = stakingPot.id;
        applyForm.submit();
      }
    });
  };

  const onDecline = (stakingPot) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to decline the offer for the staking pot ${stakingPot.id + 1}?`,
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: async () => {
        try {
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
        } catch (e) {
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">Ethernity</span>,
            description: parseExceptionReason(e.reason)
          });
        }
      }
    });
  };

  const onCancel = (stakingPot) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to cancel the offer for the staking pot ${stakingPot.id + 1}?`,
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: async () => {
        try {
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
        } catch (e) {
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">Ethernity</span>,
            description: parseExceptionReason(e.reason)
          });
        }
      }
    });
  };

  const onDetails = (stakingPot) => {
    const path = isMarketplace ? 'marketplace' : 'staking';
    if (isMarketplace) {
      navigate(
        `/${path}/${stakingPot.id + 1}?type=${stakingPot.type === StakingRequestType.BASE ? 1 : 2}&isMarketplace=true`
      );
    } else {
      navigate(`/${path}/${stakingPot.id + 1}?type=${stakingPot.type === StakingRequestType.BASE ? 1 : 2}`);
    }
  };

  const onWithdraw = () => {};

  const handlePageChanged = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setFilteredByStatusStakes(stakes.filter((stake) => stake.status === status));
  }, [stakes, status]);

  // const filteredByStatusStakes = stakes.filter((stake) => stake.status === status);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (isLoading) {
    return (
      <Row className="w-full mt-20" justify="center" align="middle">
        <Spin indicator={antIcon} />
      </Row>
    );
  }

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

  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="py-4 antFadeIn">
          <Row justify="start" gutter={[16, 16]}>
            {filteredByStatusStakes
              .slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage)
              .map((stake, index) => (
                <Col key={index} xxl={6} xl={8} lg={8} md={12} sm={24} xs={24}>
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
                    // description={`Is staking pot preapproved: ${stake.isPreApproved ? 'YES' : 'NO'}`}
                    secondaryLeftValue={getRatePerYear(stake.timestamp)}
                    secondaryLeftValueSuffix="%"
                    secondaryLeftLabel="APR FIRST YEAR"
                    secondaryCenterLabel="Approval Status"
                    secondaryCenterValue={`${stake.isPreApproved ? 'Pre-Approved' : 'Needs Approval'}`}
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
                    declinedCountLabel="TERMINATED"
                    declinedCount={stake.declinedContracts + stake.canceledContracts}
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
          {filteredByStatusStakes.length > 8 && (
            <Row justify="center" className="mt-4">
              <Pagination
                pageSize={rowsPerPage}
                current={currentPage}
                total={filteredByStatusStakes.length}
                showTotal={(total) => `Total of ${total} offers`}
                onChange={handlePageChanged}
                onP
              />
            </Row>
          )}
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

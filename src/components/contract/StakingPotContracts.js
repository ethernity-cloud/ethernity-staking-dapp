import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Empty, Form, Input, Modal, notification, Row, Spin, Tooltip } from 'antd';
import { CopyOutlined, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import MarketplaceOfferCardV1 from '../marketplace/MarketplaceOfferCardV1';
import { formatNumber } from '../../utils/numberFormatter';
import StakingStatusTag from '../staking/StakingStatusTag';
import { formatDate, getDaysUntil, getPercentOfDaysUntil, getRatePerYear } from '../../utils/StakingPotCalculator';
import EtnyStakingContract from '../../operations/etnyStakingContract';
import { StakingRequestType } from '../../utils/StakingRequestType';
import { parseExceptionReason } from '../../utils/parsing';
import { formatAddress } from '../../utils/web3Utils';
import { StakingPotStatus } from '../../utils/StakingPotStatus';

const StakingPotContracts = ({ id, isPreApproved, status, contracts }) => {
  const { account, library } = useWeb3React();
  const etnyStakingContract = new EtnyStakingContract(library);
  const [filteredByStatusContracts, setFilteredByStatusContracts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  let currentSelectedContract = null;

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

  const onApproveFormSubmitted = async (stakingPot) => {
    try {
      const rewardAddress = form.getFieldValue('rewardAddress');
      if (stakingPot.type === StakingRequestType.BASE) {
        await etnyStakingContract.approveBaseStakeRequest(stakingPot.index, rewardAddress);
      } else {
        await etnyStakingContract.approveExtendedStakeContract(id - 1, stakingPot.index, rewardAddress);
      }

      notification.success({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">Ethernity</span>,
        description: `Offer for staking pot ${currentSelectedContract + 1} has been approved.`
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

  const onApprove = (contract) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: (
        <>
          <p>{`Are you sure you want to approve the offer for the staking pot ${contract.id + 1}?`}</p>
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              rewardAddress: account
            }}
            onFinish={() => onApproveFormSubmitted(contract)}
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
        currentSelectedContract = contract.id;
        form.submit();
      }
    });
  };

  const onDecline = (contract) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to decline the offer for the staking pot ${contract.id + 1}?`,
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: async () => {
        try {
          if (contract.type === StakingRequestType.BASE) {
            await etnyStakingContract.declineBaseStakeRequest(contract.index);
          } else {
            await etnyStakingContract.declineExtendedStakeContract(id - 1, contract.index);
          }
          notification.success({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `Offer for staking pot ${contract.id + 1} has been declined.`
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

  const onCancel = (contract) => {
    Modal.confirm({
      title: <span className="uppercase">Warning</span>,
      icon: <ExclamationCircleFilled />,
      width: 520,
      wrapClassName: 'shadow-md dark:shadow-gray-500 etny-modal dark:etny-modal',
      content: `Are you sure you want to cancel the offer for the staking pot ${contract.id + 1}?`,
      okText: 'Agree',
      okButtonProps: { type: 'primary', style: { backgroundColor: '#F89430', borderRadius: 6 } },
      cancelText: 'Cancel',
      cancelButtonProps: { type: 'default', danger: true, style: { borderRadius: 6 } },
      onOk: async () => {
        try {
          console.log(contract);
          if (contract.type === StakingRequestType.BASE) {
            await etnyStakingContract.cancelBaseStakeRequest(contract.index);
          } else {
            await etnyStakingContract.cancelExtendedStakeContract(id - 1, contract.index);
          }
          notification.success({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `Offer for staking pot ${contract.id + 1} has been canceled.`
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

  useEffect(() => {
    const filtered =
      status === StakingPotStatus.TERMINATED
        ? contracts.filter(
            (stake) => stake.status === StakingPotStatus.CANCELED || stake.status === StakingPotStatus.DECLINED
          )
        : contracts.filter((stake) => stake.status === status);
    setFilteredByStatusContracts(filtered);
  }, [contracts, status]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (isLoading) {
    return (
      <Row className="w-full mt-20" justify="center" align="middle">
        <Spin indicator={antIcon} />
      </Row>
    );
  }

  if (filteredByStatusContracts.length === 0) {
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

  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="py-4 antFadeIn">
          <Row justify="start" gutter={[16, 16]}>
            {filteredByStatusContracts.map((contract, index) => (
              <Col key={index} xxl={6} xl={8} lg={8} md={12} sm={24} xs={24}>
                <MarketplaceOfferCardV1
                  loading={isLoading}
                  isContract
                  isMarketplace={false}
                  hasIcon={false}
                  hasProgressBar={false}
                  hasStatisticsDetails={false}
                  isPreApproved={isPreApproved}
                  nodeAddress={contract.nodeAddress}
                  stakeHolderAddress={contract.stakeHolderAddress}
                  // title={`Staking Request 000${contract.index + 1}`}
                  title={`Contract 000${contract.index + 1}`}
                  type={contract.type}
                  status={contract.status}
                  subtitle={`${formatDate(contract.timestamp)}`}
                  description={`Node wallet address: ${formatAddress(contract.nodeAddress)}`}
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
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  isPreApproved: PropTypes.bool,
  contracts: PropTypes.array
};

export default StakingPotContracts;

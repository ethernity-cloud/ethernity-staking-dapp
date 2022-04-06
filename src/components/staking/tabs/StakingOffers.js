import { Button, Col, Empty, Modal, notification, Row } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ethers, utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import MarketplaceOfferCardV1 from '../../marketplace/MarketplaceOfferCardV1';
import { randomIntFromInterval } from '../../../utils/Math';
import { useDispatch, useSelector } from '../../../redux/store';
import { formatNumber } from '../../../utils/numberFormatter';
import StakingStatusTag from '../StakingStatusTag';
import { updateStakeStatus } from '../../../redux/slices/staking';
import { StakingPotStatus } from '../../../utils/StakingPotStatus';
import { isMessageSigned } from '../../../utils/signer';
import StakingOptionCard from '../StakingOptionCard';

const ratesPerYear = {
  2022: 10,
  2023: 9,
  2024: 8,
  2025: 7,
  2026: 6,
  2027: 5,
  2028: 4,
  2029: 3,
  2030: 2,
  2031: 1,
  2032: 0
};

const StakingOffers = ({ status, onOpenDrawer, isMarketplace }) => {
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const { error, isLoading, stakes } = useSelector((state) => state.staking);

  const getDaysUntil = (createdOn, months) => {
    const currentDate = moment();
    const lastDate = moment(createdOn).add(months, 'M');

    return lastDate.diff(currentDate, 'days');
  };

  const getRatePerYear = (createdOn) => ratesPerYear[moment(createdOn).year()];

  const onApprove = (status, id) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to approve the offer for the staking pot ${id}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        if (await isMessageSigned(account, JSON.stringify({ account, offerId: id, status }))) {
          dispatch(updateStakeStatus({ status, id }));
          notification.success({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `Offer for staking pot ${id} has been approved.`
          });
        } else {
          notification.error({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `There was a problem approving the request!`
          });
        }
      }
    });
  };

  const onDecline = (status, id) => {
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to reject the offer for the staking pot ${id}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        if (await isMessageSigned(account, JSON.stringify({ account, offerId: id, status }))) {
          dispatch(updateStakeStatus({ status, id }));
          notification.success({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `Offer for staking pot ${id} has been rejected.`
          });
        } else {
          notification.error({
            placement: 'bottomRight',
            message: `Ethernity`,
            description: `There was a problem approving the request!`
          });
        }
      }
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
  return (
    <Row gutter={16}>
      <Col span={24}>
        <div className="py-4 antFadeI">
          <Row justify="start" gutter={[16, 16]}>
            {filteredByStatusStakes.map((stake, index) => (
              <Col key={index} xl={6} lg={8} md={12} sm={24} xs={24}>
                <MarketplaceOfferCardV1
                  loading={isLoading}
                  isMarketplace={isMarketplace}
                  title={`Staking pot 000${index + 1}`}
                  status={stake.status}
                  subtitle={stake.type}
                  // description="Some short description that needs to be added"
                  secondaryLeftValue={getRatePerYear(stake.createdOn)}
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
                  percent={randomIntFromInterval(10, 100)}
                  percentValue={getDaysUntil(stake.createdOn, stake.period)}
                  percentLabel="Time till maturity"
                  percentLabelSuffix="days"
                  onApprove={() => onApprove(StakingPotStatus.APPROVED, stake.id)}
                  onDecline={() => onDecline(StakingPotStatus.DECLINED, stake.id)}
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

StakingOffers.defaultProps = {
  hasActionButtonWhenEmpty: false
};

export default StakingOffers;

import PropTypes from 'prop-types';
import { Button, Card, Col, notification, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useTheme from '../../hooks/useTheme';
import { getWalletBalance } from '../../operations/wallet';
import { StakingRequestType } from '../../utils/StakingRequestType';
import { calculate } from '../../utils/StakingPotCalculator';

const WalletRewardCard = ({ requestType, amount, period, split, value, actionLabel, className }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0.0');
  const [estimatedReward, setEstimatedReward] = useState(0.0);
  const { library } = useWeb3React();
  const { theme, THEME_LIGHT } = useTheme();

  useEffect(async () => {
    if (!value) {
      await getAccountBalance();
    }
  }, []);

  useEffect(() => {
    const rewardsPerYearObject = calculate(requestType, amount, period, split);
    const rewardsPerYear = rewardsPerYearObject.map((rewardObject) => parseFloat(rewardObject.reward));
    const estimatedRewardSum = rewardsPerYear.reduce((prev, current) => prev + current);
    setEstimatedReward(estimatedRewardSum);
  }, [requestType, amount, period, split]);

  const getAccountBalance = async () => {
    try {
      setLoading(true);

      const balance = await getWalletBalance(library);

      setTimeout(() => {
        if (!balance) {
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">Ethernity</span>,
            description: 'Not able to retrieve wallet balance'
          });
        } else {
          setBalance(balance);
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card
      className={`bg-gray-200 dark:bg-neutral-800 border-transparent rounded-lg shadow-sm dark:shadow-neutral-700 mb-6 bg-map-pattern-light dark:bg-map-pattern bg-cover bg-no-repeat bg-center ${className}`}
      loading={loading}
    >
      <div className="bg-card-etny-logo-pattern bg-no-repeat bg-right-bottom">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Statistic
              title={<span className="text-black dark:text-white">Estimated Reward</span>}
              value={estimatedReward}
              precision={2}
              prefix="+"
              suffix={<span className="text-black dark:text-white">ETNY</span>}
              valueStyle={{ color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF' }}
              style={{ fontWeight: 500 }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Statistic
              title={<span className="text-black dark:text-white">Account Balance</span>}
              value={value || balance}
              precision={2}
              suffix={<span className="text-black dark:text-white">ETNY</span>}
              valueStyle={{ color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF' }}
              style={{ fontWeight: 500 }}
            />
            <Button type="primary" className="border-0 mt-4" onClick={getAccountBalance}>
              {actionLabel}
            </Button>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

WalletRewardCard.propTypes = {
  requestType: PropTypes.oneOf(['Base Staking', 'Extended Staking']),
  amount: PropTypes.number,
  period: PropTypes.number,
  split: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  actionLabel: PropTypes.string,
  className: PropTypes.string
};

export default WalletRewardCard;

import PropTypes from 'prop-types';
import { Button, Card, Col, notification, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import useTheme from '../../hooks/useTheme';
import { calculate } from '../../utils/StakingPotCalculator';
import EtnyContract from '../../operations/etnyContract';

const WalletRewardCard = ({ requestType, amount, period, split, value, actionLabel, className }) => {
  const { account, library } = useWeb3React();
  const etnyContract = new EtnyContract(library);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0.0');
  const [estimatedReward, setEstimatedReward] = useState(0.0);
  const { theme, THEME_LIGHT } = useTheme();

  const getProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { provider: ethereum } = provider;
    return ethereum;
  };

  useEffect(() => {
    // The "any" network will allow spontaneous network changes
    const provider = getProvider();
    provider.on('accountsChanged', async (accounts) => {
      if (accounts.length === 1) await getAccountBalance(accounts[0]);
    });
  }, []);

  useEffect(() => {
    if (!value) {
      getAccountBalance();
    }
  }, []);

  useEffect(() => {
    const rewardsPerYearObject = calculate(requestType, amount, period, split);
    const rewardsPerYear = rewardsPerYearObject.map((rewardObject) => parseFloat(rewardObject.reward));
    const estimatedRewardSum = rewardsPerYear.reduce((prev, current) => prev + current);
    setEstimatedReward(estimatedRewardSum);
  }, [requestType, amount, period, split]);

  const getAccountBalance = async (accountFromEvent) => {
    try {
      setLoading(true);

      const balance = await etnyContract.getBalance(accountFromEvent || account);

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
      className={`bg-white dark:bg-etny-blue-gray-500 border-2 border-etny-blue-gray-450 rounded-lg
      bg-map-pattern-light dark:bg-map-pattern bg-cover bg-no-repeat bg-center  ${className}`}
      loading={loading}
    >
      <div className="bg-card-etny-logo-pattern bg-no-repeat bg-right-bottom">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div>
              <p className="uppercase text-gray-800 dark:text-blue-400 text-sm font-medium mb-1">Estimated Reward</p>
              <p className="uppercase text-gray-800 dark:text-gray-50 text-xl font-medium mb-4">
                <span className="font-grotesk slashed-zero font-bold">{estimatedReward}</span>
                <span className="font-grotesk block font-bold text-xl">ETNY</span>
              </p>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div>
              <p className="uppercase text-gray-800 dark:text-blue-400 text-sm font-medium mb-1 text-right">
                Account Balance
              </p>
              <p className="uppercase text-gray-800 dark:text-gray-50 text-xl font-medium mb-4 text-right">
                <span className="font-grotesk slashed-zero font-bold">{value || balance}</span>
                <span className="font-grotesk block font-bold text-xl">ETNY</span>
              </p>
            </div>
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

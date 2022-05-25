import PropTypes from 'prop-types';
import { Button, Card, notification, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import useTheme from '../../hooks/useTheme';
import EtnyContract from '../../operations/etnyContract';

// this card should handle all kind of operation like displaying data about account balance / available tokens, staked tokens, reward claimed
const WalletCard = ({ type, title, prefix, value, suffix, actionLabel, onAction, className }) => {
  const { account, library } = useWeb3React();
  const etnyContract = new EtnyContract(library);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0.0');
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
    getAccountBalance();
  }, []);

  const getAccountBalance = async (accountFromEvent) => {
    try {
      setLoading(true);

      console.log('here');
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

  const onRefresh = () => {
    getAccountBalance();
  };

  return (
    <Card
      className={`bg-white dark:bg-etny-blue-gray-500 border-2 border-etny-blue-gray-450 rounded-lg
      bg-map-pattern-light dark:bg-map-pattern bg-cover bg-no-repeat bg-center 
      ${className}`}
      loading={loading}
    >
      <div className="bg-card-etny-logo-pattern bg-no-repeat bg-left-bottom">
        <Statistic
          title={<span className="text-black dark:text-white">{title}</span>}
          value={value || balance}
          precision={2}
          valueStyle={{
            fontFamily: 'Space Grotesk',
            fontWeight: 'bold',
            fontFeatureSettings: `'zero' 1`,
            fontVariantNumeric: 'slashed-zero',
            color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF'
          }}
          style={{ fontWeight: 500 }}
          prefix={prefix}
          suffix={suffix}
        />
        <Row justify="end" align="middle">
          <Button
            type="primary"
            className="bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
                  text-white hover:text-white focus:text-white
                  border-0 rounded-lg mt-4"
            onClick={onRefresh}
          >
            {actionLabel}
          </Button>
        </Row>
      </div>
    </Card>
  );
};

WalletCard.propTypes = {
  type: PropTypes.oneOf(['available', 'total', 'reward']),
  title: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  suffix: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  onAction: PropTypes.func,
  className: PropTypes.string
};

export default WalletCard;

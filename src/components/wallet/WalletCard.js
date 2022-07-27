import PropTypes from 'prop-types';
import { Button, Card, notification, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import EtnyContract from '../../operations/etnyContract';
import EtnyStakingContract from '../../operations/etnyStakingContract';
import { WalletCardType } from '../../utils/WalletCardType';
import { isNullOrUndefined } from '../../utils/objectUtils';

// this card should handle all kind of operation like displaying data about account balance / available tokens, staked tokens, reward claimed
const WalletCard = ({ type, title, prefix, value, suffix, actionLabel, onAction, className }) => {
  const { account, library } = useWeb3React();
  const etnyContract = new EtnyContract(library);
  const etnyStakingContract = new EtnyStakingContract(library);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0.00');

  const getProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const { provider: ethereum } = provider;
    return ethereum;
  };

  useEffect(() => {
    // The "any" network will allow spontaneous network changes
    const provider = getProvider();
    provider.on('accountsChanged', async (accounts) => {
      if (accounts.length === 1) {
        if (type === WalletCardType.STAKE) {
          await getAccountStakingBalance();
        } else {
          await getAccountBalance(accounts[0]);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (type === WalletCardType.STAKE) {
      getAccountStakingBalance();
    } else {
      getAccountBalance();
    }
  }, []);

  const getAccountBalance = async (accountFromEvent) => {
    try {
      setLoading(true);
      const balance = await etnyContract.getBalance(accountFromEvent || account);

      setTimeout(() => {
        if (isNullOrUndefined(balance)) {
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

  const getAccountStakingBalance = async () => {
    try {
      setLoading(true);
      const balance = await etnyStakingContract.getLockedBalanceAtStake();

      setTimeout(() => {
        if (isNullOrUndefined(balance)) {
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

  const onRefresh = async () => {
    if (type === WalletCardType.STAKE) {
      await getAccountStakingBalance();
    } else {
      await getAccountBalance();
    }
  };

  return (
    <Card
      className={`bg-etny-500 dark:bg-etny-700 border-2 dark:border-etny-blue-gray-450 rounded-lg
      bg-dotted-pattern bg-cover bg-no-repeat bg-center 
      ${className}`}
      loading={loading}
    >
      <div className="bg-map-pattern-light dark:bg-map-pattern bg-cover bg-no-repeat bg-center ">
        <div className="bg-card-etny-logo-pattern-1 bg-no-repeat bg-left-bottom">
          <Statistic
            title={<span className="text-etny-125 dark:text-white uppercase">{title}</span>}
            value={value || balance}
            precision={2}
            valueStyle={{
              fontFamily: 'Space Grotesk',
              fontWeight: 'bold',
              fontFeatureSettings: `'zero' on, 'cv01' on, 'cv02' on, 'cv03' on, 'cv04' on`,
              fontVariantNumeric: 'slashed-zero',
              color: '#FFFFFF'
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
                  border-0 rounded-sm mt-4"
              onClick={onRefresh}
            >
              {actionLabel}
            </Button>
          </Row>
        </div>
      </div>
    </Card>
  );
};

WalletCard.propTypes = {
  type: PropTypes.oneOf(['balance', 'reward', 'stake']),
  title: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  suffix: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]),
  onAction: PropTypes.func,
  className: PropTypes.string
};

WalletCard.defaultProps = {
  type: 'balance'
};

export default WalletCard;

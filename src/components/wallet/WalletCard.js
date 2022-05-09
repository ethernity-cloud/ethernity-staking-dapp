import PropTypes from 'prop-types';
import { Button, Card, notification, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useTheme from '../../hooks/useTheme';
import { getWalletBalance } from '../../operations/wallet';

// this card should handle all kind of operation like displaying data about account balance / available tokens, staked tokens, reward claimed
const WalletCard = ({ type, title, prefix, value, suffix, actionLabel, onAction, className }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState('0.0');
  const { library } = useWeb3React();
  const { theme, THEME_LIGHT } = useTheme();

  useEffect(() => {
    getAccountBalance();
  }, []);

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
    <Card className={`bg-white dark:bg-[#151515] border-1 border-[#26292C] rounded-lg ${className}`} loading={loading}>
      <Statistic
        title={<span className="text-black dark:text-white">{title}</span>}
        value={value || balance}
        precision={2}
        valueStyle={{ color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF' }}
        style={{ fontWeight: 500 }}
        prefix={prefix}
        suffix={suffix}
      />
      <Button type="primary" className="border-0 mt-4" onClick={getAccountBalance}>
        {actionLabel}
      </Button>
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

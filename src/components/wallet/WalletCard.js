import PropTypes from 'prop-types';
import { Button, Card, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { contract } from '../../contract/erc20';
import useTheme from '../../hooks/useTheme';

// this card should handle all kind of operation like displaying data about account balance / available tokens, staked tokens, reward claimed
const WalletCard = ({ type, title, prefix, value, suffix, actionLabel, onAction, className }) => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { active, account, activate, deactivate } = useWeb3React();
  const { theme, THEME_LIGHT } = useTheme();

  useEffect(() => {
    getAccountBalance();
  }, []);

  const getProvider = () => new ethers.providers.Web3Provider(window.ethereum);

  const getAccountBalance = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      const etnyContract = new ethers.Contract(contract.address, contract.abi, provider);
      const balance = await etnyContract.balanceOf(walletAddress);
      // const balance = await provider.getBalance(walletAddress);

      // convert a currency unit from wei to ether
      const balanceFormatted = ethers.utils.formatEther(balance);
      setTimeout(() => {
        setBalance(balanceFormatted);
        setLoading(false);
      }, 1000);

      console.log(`balance: ${balanceFormatted} ETNY`);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card className={`bg-white dark:bg-gray-800 border-transparent rounded-2xl ${className}`} loading={loading}>
      <Statistic
        title={<span className="text-black dark:text-white">{title}</span>}
        value={value || balance}
        precision={2}
        valueStyle={{ color: theme === THEME_LIGHT ? '#000000' : '#FFFFFF' }}
        style={{ fontWeight: 500 }}
        prefix={prefix}
        suffix={suffix}
      />
      <Button style={{ marginTop: 16 }} type="primary" onClick={getAccountBalance}>
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
  action: PropTypes.func,
  className: PropTypes.string
};

export default WalletCard;

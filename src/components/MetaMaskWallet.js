import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification, Row, Spin } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoLogOutOutline, IoCopyOutline, IoWallet } from 'react-icons/io5';
import useLocalStorage from '../hooks/useLocalStorage';
import EtnyQRCode from './EtnyQRCode';
import { formatAddress } from '../utils/web3Utils';

const MetaMaskWallet = ({ className }) => {
  const navigate = useNavigate();
  const { account, deactivate } = useWeb3React();
  const [isMetamaskLoggedIn, setIsMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    subscribeToEvents();
  }, []);

  const subscribeToEvents = () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      ethereum.on('accountsChanged', (accounts) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
        if (accounts.length === 0) {
          localStorage.removeItem('metamask_account');
          notification.success({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">MetaMask</span>,
            description: 'Successfully logged out'
          });
          navigate('/welcome');
        }
      });

      ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });

      // ethereum.on('disconnect', (error) => {
      //   console.log('disconnected');
      // });
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      setIsMetamaskLoggedIn(null);
      // onLoggedIn(false);
      notification.success({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'Successfully logged out'
      });
      navigate('/welcome');
    } catch (ex) {
      console.log(ex);
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'An error occurred while trying to disconnect from MetaMask Wallet'
      });
    }
  };

  const menu = (
    <Menu className="w-48 bg-etny-light-background dark:bg-etny-background text-black dark:text-white border-black dark:border-[#2D2F31] rounded-md">
      <Menu.Item
        key={1}
        className="text-black dark:text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover"
      >
        <EtnyQRCode account={account} />
      </Menu.Item>
      <CopyToClipboard text={account}>
        <Menu.Item
          key={2}
          icon={<IoCopyOutline className="text-blue-500 text-lg" />}
          className="text-black dark:text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover"
        >
          Copy Wallet Address
        </Menu.Item>
      </CopyToClipboard>
      <Menu.Item
        key={3}
        icon={<IoLogOutOutline className="text-red-500 text-lg" />}
        className="text-black dark:text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover"
        onClick={disconnect}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={`${className}`}>
      {/* {active && isMetamaskLoggedIn !== null && ( */}
      <Dropdown overlay={menu} trigger="click" className="hidden md:block">
        <Button
          type="primary"
          className="h-16 w-48 rounded-lg bg-etny-200 dark:bg-etny-dark-100 text-white dark:text-white border-0"
        >
          {loading && (
            <Row justify="center" align="middle">
              <Spin indicator={antIcon} />
            </Row>
          )}
          {!loading && (
            <>
              <Row>
                <span>My Wallet</span>
              </Row>
              <Row align="middle" justify="space-between" className="w-full">
                <Badge dot status="success" size="default" />
                <span className="px-2 text-white dark:text-success">{formatAddress(account)}</span>
                <IoWallet className="text-white dark:text-success text-lg" />
              </Row>
            </>
          )}
        </Button>
      </Dropdown>
      {/* )} */}
    </div>
  );
};

MetaMaskWallet.propTypes = {
  className: PropTypes.string
};

export default MetaMaskWallet;

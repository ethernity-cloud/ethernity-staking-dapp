import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { WalletFilled, LogoutOutlined, CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification, Row, Spin } from 'antd';
import { QRCode } from 'react-qrcode-logo';
import { injectedConnector } from '../connectors/connectors';
import useLocalStorage from '../hooks/useLocalStorage';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import EtnyContract from '../operations/etnyContract';

const MetaMaskButton = ({ className }) => {
  const navigate = useNavigate();
  const useBloxberg = process.env.USE_BLOXBERG;
  // here we can destructure out various things from web3React such as
  // active (which is true if the user is connected and false otherwise)
  // activate and deactivate which we use to instantiate and break the users
  // connection
  const web3React = useWeb3React();
  const { active, account, activate, library, deactivate } = web3React;
  const etnyContract = new EtnyContract(library);
  const [isMetamaskLoggedIn, setIsMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);
  const [loading, setLoading] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();

  const bloxbergChainId = `0x${Number(8995).toString(16)}`;
  const bloxbergNetwork = {
    // '0x2323'
    chainId: bloxbergChainId,
    chainName: 'bloxberg',
    nativeCurrency: {
      name: 'BERG',
      symbol: 'Bergs',
      decimals: 18
    },
    rpcUrls: ['https://core.bloxberg.org'],
    blockExplorerUrls: ['https://blockexplorer.bloxberg.org']
  };

  const ropstenChainId = `0x${Number(3).toString(16)}`;
  const ropstenNetwork = {
    chainId: ropstenChainId,
    chainName: 'Ropsten',
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ROP',
      decimals: 18
    },
    rpcUrls: [`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`],
    blockExplorerUrls: ['https://ropsten.etherscan.io']
  };

  console.log(account);

  // here we use a useEffect so that on page load we can check if there is
  // an account in local storage. if there is we call the connect onLoad func
  useEffect(() => {
    if (isMetamaskLoggedIn !== null) {
      console.log(isMetamaskLoggedIn);
      connectOnLoad();
    }
    // in case we want to auto connect disable the code below
    // connectWalletHandler();
  }, [isMetamaskLoggedIn]);

  useEffect(() => {
    subscribeToEvents();
  }, []);

  const trySwitchOrAddBloxbergNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: bloxbergChainId }]
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [bloxbergNetwork]
          });
        } catch (addError) {
          // handle "add" error
          console.log(addError);
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">MetaMask</span>,
            description: 'MetaMask Wallet is not able to configure Bloxberg network'
          });
        }
      } else {
        // handle other "switch" errors
        console.log(switchError);
        notification.error({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">MetaMask</span>,
          description: 'MetaMask Wallet is not able to configure Bloxberg network'
        });
      }
    }
  };

  const trySwitchOrAddRopstenNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ropstenChainId }]
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ropstenNetwork]
          });
        } catch (addError) {
          // handle "add" error
          console.log(addError);
          notification.error({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">MetaMask</span>,
            description: 'MetaMask Wallet is not able to configure Ropsten network'
          });
        }
      } else {
        // handle other "switch" errors
        console.log(switchError);
        notification.error({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">MetaMask</span>,
          description: 'MetaMask Wallet is not able to configure Ropsten network'
        });
      }
    }
  };

  const subscribeToEvents = () => {
    const { ethereum } = window;
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
  };

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      if (useBloxberg) {
        await trySwitchOrAddBloxbergNetwork();
      } else {
        await trySwitchOrAddRopstenNetwork();
      }
      await etnyContract.getBalance();
    } else {
      console.log('Need to install MetaMask');
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'MetaMask Wallet is not working or it is not installed'
      });
    }
  };

  // function that is called on page load if and only if their exists and
  // item for the user account in local storage
  const connectOnLoad = async () => {
    try {
      // here we use activate to create the connection
      await activate(injectedConnector);
      navigate('/staking');
    } catch (ex) {
      console.log(ex);
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'An error occurred while trying to connect to MetaMask Wallet'
      });
    }

    // we use web3.eth to get the accounts to store it in local storage
    // const accounts = await library.listAccounts();
    setIsMetamaskLoggedIn(account);
  };

  const connectOnClick = async () => {
    try {
      if (isMetamaskLoggedIn == null) {
        setLoading(true);
        if (useBloxberg) {
          await trySwitchOrAddBloxbergNetwork();
        } else {
          await trySwitchOrAddRopstenNetwork();
        }
        await activate(injectedConnector);
        // const accounts = await library.listAccounts();
        setIsMetamaskLoggedIn(account);
        navigate('/staking');

        setTimeout(() => {
          setLoading(false);
          notification.success({
            placement: 'bottomRight',
            className: 'bg-white dark:bg-black text-black dark:text-white',
            message: <span className="text-black dark:text-white">MetaMask</span>,
            description: 'Successfully logged in'
          });
        }, 2000); // wait 2 seconds
      } else {
        await disconnect();
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'An error occurred while trying to connect to MetaMask Wallet'
      });
    }
  };

  const disconnect = async () => {
    try {
      await deactivate();
      setIsMetamaskLoggedIn(null);
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

  const onCopyWalletAddress = async () => {
    try {
      await copy(account);
      console.log(copiedText);
      if (copiedText) {
        notification.success({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">MetaMask</span>,
          description: 'Successfully copied wallet address'
        });
      } else {
        notification.error({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">MetaMask</span>,
          description: 'An error occurred while trying to copy wallet address'
        });
      }
    } catch (e) {
      notification.error({
        placement: 'bottomRight',
        className: 'bg-white dark:bg-black text-black dark:text-white',
        message: <span className="text-black dark:text-white">MetaMask</span>,
        description: 'An error occurred while trying to copy wallet address'
      });
    }
  };
  const menu = (
    <Menu className="w-48 bg-etny-200 dark:bg-etny-primary-button-focus text-black dark:text-white border-1 border-black dark:border-[#2D2F31]">
      <Menu.Item key={1} className="text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover">
        <QRCode
          value={account}
          removeQrCodeBehindLogo
          ecLevel="H"
          logoWidth={48}
          logoHeight={48}
          logoImage="/static/logo/logo_200x200.png"
        />
      </Menu.Item>
      <Menu.Item
        key={2}
        icon={<CopyOutlined className="text-blue-500" />}
        className="text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover"
        onClick={onCopyWalletAddress}
      >
        Copy Wallet Address
      </Menu.Item>
      <Menu.Item
        key={3}
        icon={<LogoutOutlined className="text-red-500" />}
        className="text-white hover:bg-etny-200 dark:hover:bg-etny-primary-button-hover"
        onClick={disconnect}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={`${className}`}>
      {active && isMetamaskLoggedIn !== null ? (
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
                  <span className="px-2 text-white dark:text-success">
                    {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </span>
                  <WalletFilled />
                </Row>
              </>
            )}
          </Button>
        </Dropdown>
      ) : (
        <Button
          onClick={connectOnClick}
          loading={loading}
          size="large"
          className="hidden md:block
          bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus
          text-white hover:text-white focus:text-white
          border-0 rounded-lg"
        >
          <span>Connect Wallet</span>
          <WalletFilled />
        </Button>
      )}
    </div>
  );
};

MetaMaskButton.propTypes = {
  className: PropTypes.string
};

export default MetaMaskButton;

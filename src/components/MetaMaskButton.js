import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { WalletFilled, LogoutOutlined, CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification, Row, Spin } from 'antd';
import { QRCode } from 'react-qrcode-logo';
import { contract } from '../contract/erc20';
import { injectedConnector } from '../connectors/connectors';
import useLocalStorage from '../hooks/useLocalStorage';

const MetaMaskButton = ({ className }) => {
  const navigate = useNavigate();
  const [isMetamaskLoggedIn, setIsMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);
  const [loading, setLoading] = useState(false);

  // here we can destructure out various things from web3React such as
  // active (which is true if the user is connected and false otherwise)
  // activate and deactivate which we use to instantiate and break the users
  // connection
  const { active, account, activate, library, deactivate } = useWeb3React();

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

  // here we use a useEffect so that on page load we can check if there is
  // an account in local storage. if there is we call the connect onLoad func
  useEffect(async () => {
    if (isMetamaskLoggedIn !== null) {
      await connectOnLoad();
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

  const getAccountBalance = async () => {
    // const provider = getProvider();
    await library.send('eth_requestAccounts', []);
    const signer = library.getSigner();
    const walletAddress = await signer.getAddress();

    const etnyContract = new ethers.Contract(contract.address, contract.abi, library);
    const balance = await etnyContract.balanceOf(walletAddress);
    // const balance = await provider.getBalance(walletAddress);

    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log(`balance: ${balanceInEth} ETNYYYYY`);
  };

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      await trySwitchOrAddBloxbergNetwork();
      await getAccountBalance();
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
    const accounts = await library.listAccounts();
    setIsMetamaskLoggedIn(accounts[0]);
  };

  const connectOnClick = async () => {
    try {
      if (isMetamaskLoggedIn == null) {
        setLoading(true);
        await trySwitchOrAddBloxbergNetwork();
        await activate(injectedConnector);
        const accounts = await library.listAccounts();
        setIsMetamaskLoggedIn(accounts[0]);

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

  const menu = (
    <Menu className="w-48 bg-gray-100 dark:bg-[#181C1E] text-black dark:text-white border-1 border-black dark:border-[#2D2F31]">
      <Menu.Item key={1} className="text-black dark:text-white dark:hover:bg-gray-800">
        <QRCode
          value="0x56312e27367c059ae2719def4d247845ba0a671d"
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
        className="text-black dark:text-white dark:hover:bg-gray-800"
        onClick={disconnect}
      >
        Copy Wallet Address
      </Menu.Item>
      <Menu.Item
        key={3}
        icon={<LogoutOutlined className="text-red-500" />}
        className="text-black dark:text-white dark:hover:bg-gray-800"
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
            className="h-16 w-48 rounded-lg bg-gray-100 dark:bg-[#181C1E] text-black dark:text-white border-1 border-black dark:border-[#2D2F31]"
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
                  <span className="px-2">
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
          className="hidden md:block bg-etny-button-primary hover:bg-etny-button-hover hover:text-white focus:bg-etny-button-focus focus:text-white text-white border-0 rounded-lg"
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

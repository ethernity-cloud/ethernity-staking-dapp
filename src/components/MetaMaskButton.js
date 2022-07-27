import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { WalletFilled } from '@ant-design/icons';
import { Button, notification } from 'antd';
import { ethers } from 'ethers';
import { injectedConnector } from '../connectors/connectors';
import useLocalStorage from '../hooks/useLocalStorage';
import EtnyContract from '../operations/etnyContract';

const MetaMaskButton = ({ className, isForWelcome }) => {
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
  // const [loading, setLoading] = useState(false);

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

  // here we use a useEffect so that on page load we can check if there is
  // an account in local storage. if there is we call the connect onLoad func
  useEffect(() => {
    if (isMetamaskLoggedIn) {
      console.log('connecting on page load...');
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
    // onLoggedIn(true);
  };

  const connectOnClick = async () => {
    try {
      if (isMetamaskLoggedIn == null) {
        // setLoading(true);
        if (useBloxberg) {
          await trySwitchOrAddBloxbergNetwork();
        } else {
          await trySwitchOrAddRopstenNetwork();
        }

        await activate(injectedConnector, undefined, true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('activated');
        const accounts = await provider.listAccounts();
        const account = accounts[0];
        setIsMetamaskLoggedIn(account);
        // setLoading(false);

        notification.success({
          placement: 'bottomRight',
          className: 'bg-white dark:bg-black text-black dark:text-white',
          message: <span className="text-black dark:text-white">MetaMask</span>,
          description: 'Successfully logged in'
        });
        navigate('/staking');
      } else {
        await disconnect();
      }
    } catch (ex) {
      console.log(ex);
      // setLoading(false);
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

  const bClassName = isForWelcome
    ? 'h-12 w-full bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus text-white hover:text-white focus:text-white border-0 rounded-md'
    : 'hidden md:block bg-etny-button-primary hover:bg-etny-button-hover focus:bg-etny-button-focus text-white hover:text-white focus:text-white border-0 rounded-lg';
  return (
    <Button
      onClick={connectOnClick}
      disabled={!window.ethereum}
      // loading={loading}
      size="large"
      className={bClassName}
    >
      <span>Connect Wallet</span>
      <WalletFilled />
    </Button>
  );
};

MetaMaskButton.propTypes = {
  className: PropTypes.string,
  isForWelcome: PropTypes.bool
};

export default MetaMaskButton;

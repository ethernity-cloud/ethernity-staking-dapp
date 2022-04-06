import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, Menu, notification } from 'antd';
import { isMobile } from 'react-device-detect';
import { contract } from '../contract/erc20';

// declare supported chains
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [8995]
});

const MetaMaskButton = ({ className }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // here we can destructure out various things from web3React such as
  // active (which is true if the user is connected and false otherwise)
  // activate and deactivate which we use to instantiate and break the users
  // connection
  const { active, account, activate, deactivate } = useWeb3React();

  const bloxberChainId = `0x${Number(8995).toString(16)}`;
  const bloxbergNetwork = {
    // '0x2323'
    chainId: bloxberChainId,
    chainName: 'bloxberg',
    nativeCurrency: {
      name: 'BERG',
      symbol: 'Bergs',
      decimals: 18
    },
    rpcUrls: ['https://core.bloxberg.org'],
    blockExplorerUrls: ['https://blockexplorer.bloxberg.org']
  };
  // set up an element in local storage that we use to hold the connected account
  let acc = localStorage.getItem('metamask_account');

  // here we use a useEffect so that on page load we can check if there is
  // an account in local storage. if there is we call the connect onLoad func
  // above which allows us to presist the connection and i also call connectWalletHandler
  // which sets up web3.js so we can call web3.eth.getAccounts()
  useEffect(() => {
    if (acc != null) {
      connectOnLoad();
    }
    // in case we want to auto connect disable the code below
    // connectWalletHandler();
  }, []);

  useEffect(() => {
    subscribeToEvents();
  }, []);

  const getProvider = () => new ethers.providers.Web3Provider(window.ethereum);

  const trySwitchOrAddBloxbergNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: bloxberChainId }]
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
            message: `MetaMask`,
            description: 'MetaMask Wallet is not able to configure Bloxberg network'
          });
        }
      } else {
        // handle other "switch" errors
        console.log(switchError);
        notification.error({
          placement: 'bottomRight',
          message: `MetaMask`,
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
          message: `MetaMask`,
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

    ethereum.on('disconnect', (error) => {
      console.log('disconnected');
    });
  };

  const getAccountBalance = async () => {
    const provider = getProvider();
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    const etnyContract = new ethers.Contract(contract.address, contract.abi, provider);
    const balance = await etnyContract.balanceOf(walletAddress);
    // const balance = await provider.getBalance(walletAddress);

    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log(`balance: ${balanceInEth} ETNYYYYY`);
  };

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      // console.log('MetaMask Here!');
      // window.ethereum.request({ method: 'eth_requestAccounts' });

      await trySwitchOrAddBloxbergNetwork();
      await getAccountBalance();
    } else {
      console.log('Need to install MetaMask');
      notification.error({
        placement: 'bottomRight',
        message: `MetaMask`,
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
        message: `MetaMask`,
        description: 'An error occurred while trying to connect on MetaMask Wallet'
      });
    }

    // we use web3.eth to get the accounts to store it in local storage
    const accounts = await getProvider().listAccounts();
    acc = localStorage.setItem('metamask_account', accounts[0]);
  };

  // however in the case where there is no item in local storage we use this
  // function to connect which is called when we click the connect button. its
  // essentially the same but we check if local storage is null if it is we activate
  // if its not then we disconnect. And when we disconnect we remove the acccount from local storage
  const connectOnClick = async () => {
    try {
      if (localStorage.getItem('metamask_account') == null) {
        setLoading(true);
        await trySwitchOrAddBloxbergNetwork();
        await activate(injectedConnector);
        const accounts = await getProvider().listAccounts();
        localStorage.setItem('metamask_account', accounts[0]);

        navigate('/staking');

        setTimeout(() => {
          setLoading(false);
          notification.success({
            placement: 'bottomRight',
            message: `MetaMask`,
            description: 'Successfully logged in'
          });
        }, 1600); // wait 2 seconds
      } else {
        await disconnect();
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: `MetaMask`,
        description: 'An error occurred while trying to connect on MetaMask Wallet'
      });
    }
  };

  const disconnect = async () => {
    try {
      await deactivate();
      localStorage.removeItem('metamask_account');
      notification.success({
        placement: 'bottomRight',
        message: `MetaMask`,
        description: 'Successfully logged out'
      });
      navigate('/welcome');
    } catch (ex) {
      console.log(ex);
      notification.error({
        placement: 'bottomRight',
        message: `MetaMask`,
        description: 'An error occurred while trying to disconnect from MetaMask Wallet'
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key={1} icon={<LogoutOutlined />} onClick={disconnect}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`${className}`}>
      {active ? (
        <Dropdown overlay={menu} className="hidden md:block">
          <Button loading={loading}>
            <WalletOutlined />
            <span className="px-2">
              {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </span>
            <Badge dot status="success" size="default" />
          </Button>
        </Dropdown>
      ) : (
        <Button onClick={connectOnClick} loading={loading}>
          {!isMobile && <span>Connect Wallet</span>}
          <WalletOutlined />
        </Button>
      )}
    </div>
  );
};

export default MetaMaskButton;

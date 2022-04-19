import './App.css';
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import ApplicationLayout from './layouts/ApplicationLayout';
import { injectedConnector } from './connectors/connectors';

export default function App() {
  const { activate } = useWeb3React();

  useEffect(() => {
    console.log('activating provider...');
    const activateProvider = async () => {
      await activate(injectedConnector);
    };

    activateProvider();
  }, []);
  return <ApplicationLayout />;
}

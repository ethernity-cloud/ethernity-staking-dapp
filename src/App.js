import './App.css';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import ApplicationLayout from './layouts/ApplicationLayout';
import { injectedConnector } from './connectors/connectors';

export default function App() {
  const web3React = useWeb3React();
  useEffect(() => {
    const activate = async () => {
      await web3React.activate(injectedConnector, undefined, true);
      console.log('activated');
    };
    activate();
  }, []);

  return <ApplicationLayout />;
}

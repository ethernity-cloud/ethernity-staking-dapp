import './App.css';
import { useWeb3React } from '@web3-react/core';
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from './layouts/ApplicationLayout';
import { injectedConnector } from './connectors/connectors';
import { useLoading } from './hooks/useLoading';

export const LoadingContext = createContext(true);
export default function App() {
  const navigate = useNavigate();
  const [loading, toggleLoading] = useLoading(true);
  const web3React = useWeb3React();
  useEffect(() => {
    const activate = async () => {
      await web3React.activate(injectedConnector, undefined, true);
      toggleLoading();
      console.log('activated');
    };
    navigate('/staking');
    activate();
  }, []);

  return (
    <LoadingContext.Provider value={loading}>
      <ApplicationLayout />
    </LoadingContext.Provider>
  );
}

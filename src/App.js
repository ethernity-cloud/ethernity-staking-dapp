import './App.css';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationLayout from './layouts/ApplicationLayout';
import { injectedConnector } from './connectors/connectors';
import ApplicationNotAuthorizedLayout from './layouts/ApplicationNotAuthorizedLayout';
import useLocalStorage from './hooks/useLocalStorage';
import { PageLoadingIndicator } from './components/common/PageLoadingIndicator';

export default function App() {
  const { active, activate } = useWeb3React();
  const navigate = useNavigate();

  const [isMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);

  useEffect(() => {
    const connect = async () => {
      await activate(injectedConnector, undefined, true);
      // console.log('activated');
      navigate('/staking');
    };
    if (isMetamaskLoggedIn) {
      connect();
    }
  }, [activate, isMetamaskLoggedIn]);

  if (isMetamaskLoggedIn && !active) return <PageLoadingIndicator />;
  if (active) return <ApplicationLayout active={active} />;
  return <ApplicationNotAuthorizedLayout />;
}

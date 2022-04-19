import { useWeb3React } from '@web3-react/core';
import { Navigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export const ProtectedRoute = ({ redirectPath = '/welcome', children }) => {
  const [isMetamaskLoggedIn] = useLocalStorage('etny-metamask-logged-in', null);
  const { active } = useWeb3React();

  if (!isMetamaskLoggedIn || !active) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

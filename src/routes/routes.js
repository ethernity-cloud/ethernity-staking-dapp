import {
  AreaChartOutlined,
  BarChartOutlined,
  BankOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import NotFound from '../pages/app/NotFound';
import DashboardPage from '../pages/app/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import StakingPage from '../pages/app/StakingPage';
import MarketplacePage from '../pages/app/MarketplacePage';
import WelcomePage from '../pages/WelcomePage';
import Loadable from '../components/Loadable';
import TransactionsPage from '../pages/app/TransactionsPage';
import AccountPage from '../pages/app/AccountPage';

const authRoutes = [
  {
    exact: true,
    path: '/welcome',
    name: 'Welcome',
    icon: AreaChartOutlined,
    element: <WelcomePage />,
    visible: false
  },
  // {
  //   exact: true,
  //   path: '/dashboard',
  //   name: 'Dasboard',
  //   icon: AreaChartOutlined,
  //   element: <DashboardPage />,
  //   visible: true
  // },
  {
    path: '/staking',
    name: 'Staking',
    icon: BankOutlined,
    element: <StakingPage />,
    visible: true
  },
  {
    path: '/staking/create',
    name: 'Staking create',
    element: <StakingPage />,
    visible: false
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    icon: ShoppingCartOutlined,
    element: <MarketplacePage />,
    visible: true
  },
  // {
  //   path: '/transactions',
  //   name: 'Transactions',
  //   icon: BarChartOutlined,
  //   element: <TransactionsPage />,
  //   visible: true
  // },
  // {
  //   path: '/account',
  //   name: 'Account',
  //   icon: UserOutlined,
  //   element: <AccountPage />,
  //   visible: true
  // },
  { path: '404', name: '404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/staking" replace /> }
];

const welcomeRoutes = [
  {
    exact: true,
    path: '/welcome',
    name: 'Welcome',
    icon: AreaChartOutlined,
    element: <WelcomePage />,
    visible: false
  },
  { path: '404', name: '404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/welcome" replace /> }
];
// const StakingPage = Loadable(lazy(() => import('../pages/app/StakingPage')));

export { authRoutes, welcomeRoutes };

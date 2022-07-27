import { AreaChartOutlined, BankOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { IoBagCheckSharp, IoHomeSharp } from 'react-icons/io5';
import NotFoundPage from '../pages/NotFoundPage';
import StakingPage from '../pages/app/StakingPage';
import MarketplacePage from '../pages/app/MarketplacePage';
import WelcomePage from '../pages/WelcomePage';
import { ProtectedRoute } from './ProtectedRoute';
import StakingPotDetailsPage from '../pages/app/StakingPotDetailsPage';

const authRoutes = [
  {
    exact: true,
    path: '/welcome',
    name: 'Welcome',
    icon: AreaChartOutlined,
    element: <WelcomePage />,
    visible: false
  },
  {
    path: '/staking',
    name: 'Staking',
    icon: IoHomeSharp,
    element: (
      <ProtectedRoute>
        <StakingPage />
      </ProtectedRoute>
    ),
    visible: true
  },
  {
    path: '/staking/:id',
    name: 'Staking pot details',
    icon: BankOutlined,
    element: (
      <ProtectedRoute>
        <StakingPotDetailsPage />
      </ProtectedRoute>
    ),
    visible: false
  },
  {
    path: '/marketplace/:id',
    name: 'Marketplace Staking pot details',
    icon: BankOutlined,
    element: (
      <ProtectedRoute>
        <StakingPotDetailsPage />
      </ProtectedRoute>
    ),
    visible: false
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    icon: IoBagCheckSharp,
    element: (
      <ProtectedRoute>
        <MarketplacePage />
      </ProtectedRoute>
    ),
    visible: true
  },
  { path: '404', name: '404', element: <NotFoundPage /> },
  { path: '*', element: <Navigate to="/welcome" replace /> }
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

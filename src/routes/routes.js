import { AreaChartOutlined, BankOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StakingPage from '../pages/app/StakingPage';
import MarketplacePage from '../pages/app/MarketplacePage';
import WelcomePage from '../pages/WelcomePage';
import { ProtectedRoute } from './ProtectedRoute';

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
    icon: BankOutlined,
    element: (
      <ProtectedRoute>
        <StakingPage />
      </ProtectedRoute>
    ),
    visible: true
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    icon: ShoppingCartOutlined,
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

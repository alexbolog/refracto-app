import Account from 'pages/Account';
import Marketplace from 'pages/Marketplace';
import Projects from 'pages/Projects';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';
import Portfolio from './pages/Portfolio';
import {
  faBookOpen,
  faFileContract,
  faHandshakeAlt,
  faIdBadge,
  faListCheck,
  faSackDollar,
  faShop,
  faWandSparkles
} from '@fortawesome/free-solid-svg-icons';
import Reports from 'pages/Reports';
import Transactions from 'pages/Account/Transactions';
import Agreements from 'pages/Agreements';

export const routeNames = {
  dashboard: '/dashboard',
  portfolio: '/portfolio',

  home: '/projects',
  marketplace: '/marketplace',

  reports: '/reports',
  transactions: '/transactions',
  agreements: '/agreements',
  account: '/profile',

  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
  // projectPage: '/projects/:id',
  // projectDevelopers: '/developers',
  // projectDeveloperPage: '/developers/:id'
};

const routes: Array<any> = [
  {
    path: routeNames.dashboard,
    title: 'Overview',
    component: Dashboard,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faWandSparkles
  },
  {
    path: routeNames.portfolio,
    title: 'Portfolio',
    component: Portfolio,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faBookOpen
  },
  {
    path: routeNames.home,
    title: 'Available Projects',
    component: Projects,
    authenticatedRoute: false,
    displayInNavbar: true,
    icon: faListCheck
  },
  {
    path: routeNames.marketplace,
    title: 'Market',
    component: Marketplace,
    authenticatedRoute: false,
    displayInNavbar: true,
    icon: faShop
  },
  {
    path: routeNames.reports,
    title: 'Reports',
    component: Reports,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faFileContract
  },
  {
    path: routeNames.transactions,
    title: 'Transactions',
    component: Transactions,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faSackDollar
  },
  {
    path: routeNames.agreements,
    title: 'Agreements',
    component: Agreements,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faHandshakeAlt
  },

  {
    path: routeNames.account,
    title: 'Account',
    component: Account,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: faIdBadge
  },
  // required
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  }
];

const mappedRoutes = routes.map((route) => {
  const envString =
    process.env.NODE_ENV === 'production' ? '' : process.env.NODE_ENV;
  const title = route.title
    ? `${route.title} • ${envString} Refracto`
    : `${envString} Refracto`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export const NAVBAR_MENU_ITEMS = routes
  .filter((r) => r.displayInNavbar)
  .map((r) => {
    return {
      route: r.path,
      display: r.title,
      protectedRoute: r.authenticatedRoute,
      icon: r.icon
    };
  });

export default mappedRoutes;

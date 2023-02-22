import Account from 'pages/Account';
import Marketplace from 'pages/Marketplace';
import AvailableProjects from 'pages/AvailableProjects';
import withPageTitle from './components/PageTitle';
import Overview from './pages/Overview';
import Transaction from './pages/Transaction';
import Portfolio from './pages/Portfolio';
import Reports from 'pages/Reports';
import Agreements from 'pages/Agreements';
import { ReactComponent as OverviewIcon } from 'assets/icons/refracto/insights.svg';
import { ReactComponent as PortfolioIcon } from 'assets/icons/refracto/import_contacts.svg';
import { ReactComponent as AvailableProjectsIcon } from 'assets/icons/refracto/checklist.svg';
import { ReactComponent as MarketIcon } from 'assets/icons/refracto/store.svg';
import { ReactComponent as ReportsIcon } from 'assets/icons/refracto/summarize.svg';
import { ReactComponent as TransactionsIcon } from 'assets/icons/refracto/paid.svg';
import { ReactComponent as AgreementsIcon } from 'assets/icons/refracto/handshake.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/refracto/account_box.svg';
import Transactions from 'pages/Transactions';
import ProjectDetails from 'pages/ProjectDetails';

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
  walletconnect: '/walletconnect',
  projectPage: '/projects/:id'
  // projectDevelopers: '/developers',
  // projectDeveloperPage: '/developers/:id'
};

const routes: Array<any> = [
  {
    path: routeNames.dashboard,
    title: 'Overview',
    component: Overview,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: OverviewIcon
  },
  {
    path: routeNames.portfolio,
    title: 'Portfolio',
    component: Portfolio,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: PortfolioIcon
  },
  {
    path: routeNames.home,
    title: 'Available Projects',
    component: AvailableProjects,
    authenticatedRoute: false,
    displayInNavbar: true,
    icon: AvailableProjectsIcon
  },
  {
    path: routeNames.projectPage,
    title: 'Project details',
    component: ProjectDetails,
    authenticatedRoute: false,
    displayInNavbar: false
  },
  {
    path: routeNames.marketplace,
    title: 'Market',
    component: Marketplace,
    authenticatedRoute: false,
    displayInNavbar: true,
    icon: MarketIcon
  },
  {
    path: routeNames.reports,
    title: 'Reports',
    component: Reports,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: ReportsIcon
  },
  {
    path: routeNames.transactions,
    title: 'Transactions',
    component: Transactions,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: TransactionsIcon
  },
  {
    path: routeNames.agreements,
    title: 'Agreements',
    component: Agreements,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: AgreementsIcon
  },

  {
    path: routeNames.account,
    title: 'Profile',
    component: Account,
    authenticatedRoute: true,
    displayInNavbar: true,
    icon: ProfileIcon
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

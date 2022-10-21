import Account from 'pages/Account';
import Marketplace from 'pages/Marketplace';
import ProjectDetails from 'pages/ProjectDetails';
import ProjectDeveloperDetails from 'pages/ProjectDeveloperDetails';
import Projects from 'pages/Projects';
import withPageTitle from './components/PageTitle';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Transaction from './pages/Transaction';

export const routeNames = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect',
  account: '/account',
  marketplace: '/marketplace',
  projects: '/projects',
  projectPage: '/projects/:id',
  projectDevelopers: '/developers',
  projectDeveloperPage: '/developers/:id'
};

const routes: Array<any> = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  },
  {
    path: routeNames.account,
    title: 'Account',
    component: Account
  },
  {
    path: routeNames.marketplace,
    title: 'Marketplace',
    component: Marketplace
  },
  {
    path: routeNames.projects,
    title: 'Projects',
    component: Projects
  },
  {
    path: routeNames.projectPage,
    title: 'Project Details',
    component: ProjectDetails
  },
  // {
  //   path: routeNames.projectDevelopers,
  //   title: 'Project Developers',
  //   component: Projects
  // },
  {
    path: routeNames.projectDeveloperPage,
    title: 'Project Developer',
    component: ProjectDeveloperDetails
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

export default mappedRoutes;

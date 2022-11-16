import * as React from 'react';
import ReactGA from 'react-ga4';
import DashboardGraph2 from './dashboard-graph2';

const Dashboard = () => {
  const isLastUrlSegmentEqualTo = (urlSegment: string) => {
    const prevPage = document.referrer;
    const urlSegments = prevPage.split('?')[0].split('/');
    const possiblyEmptyString = urlSegments.pop();
    const lastSegment = possiblyEmptyString
      ? possiblyEmptyString
      : urlSegments.pop();
    return lastSegment === urlSegment;
  };

  const analytics = () => {
    const fromLogin =
      document.referrer.startsWith(window.location.origin) &&
      isLastUrlSegmentEqualTo('unlock');
    if (fromLogin) {
      console.log('User successfully logged in');
      ReactGA.event({
        category: 'engagement',
        action: 'login_2',
        label: 'User successfully logged in'
      });
    }
  };

  React.useEffect(() => {
    analytics();
  }, []);

  return (
    <div className='container py-4'>
      <div className='row'>
        <DashboardGraph2 />
        <div className='col-12 col-md-10 mx-auto'></div>
      </div>
    </div>
  );
};

export default Dashboard;

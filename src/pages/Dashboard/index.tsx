import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';
import ReactGA from 'react-ga4';

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
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

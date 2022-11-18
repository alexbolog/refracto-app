import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import CustomAlert from 'components/CustomAlert';
import DonutChartStatisticsCard from 'components/DonutChartStatisticsCard';
import PaymentStatusContainer from 'components/PaymentStatusContainer';
import * as React from 'react';
import ReactGA from 'react-ga4';
import ActiveInvestmentsStatistics from './ActiveInvestmentsStatistics';
import DoughnutChartRow from './DoughnutChartRow';
import GeneralInvestmentStatistics from './GeneralInvestmentStatistics';
import GeneralStatisticsGraph from './GeneralStatisticsGraph';

const Dashboard = () => {
  const [hasClaimableCredits, setHasClaimableCredits] = React.useState(true);

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

  const claimableCreditsComponent = () => (
    <>
      You have <strong>€1,456</strong> credits!
    </>
  );

  return (
    <>
      {hasClaimableCredits && (
        <div className='row'>
          <div className='col-lg-12 col-md-12 col-sm-12'>
            <CustomAlert
              type={'primary'}
              isDismissable={false}
              messageComponent={claimableCreditsComponent()}
              actionMessage={'Claim now'}
              action={async () => window.alert('TO BE DONE')}
            />
          </div>
        </div>
      )}
      <div className='row'>
        <GeneralInvestmentStatistics />
      </div>
      <div className='row'>
        <GeneralStatisticsGraph />
      </div>
      <div className='row'>
        <ActiveInvestmentsStatistics />
      </div>
      <div className='row'>
        <DoughnutChartRow />
      </div>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 col-md-12'>
          <PaymentStatusContainer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

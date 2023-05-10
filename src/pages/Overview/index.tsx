import {
  FavoriteProjectCarousel,
  SuggestedProjectsCarousel
} from 'components/ProjectCardCarousel';
import CustomAlert from 'components/CustomAlert';
import PaymentStatusContainer from 'components/PaymentStatusContainer';
import * as React from 'react';
import ReactGA from 'react-ga4';
import ActiveInvestmentsStatistics from './ActiveInvestmentsStatistics';
import DoughnutChartRow from './DoughnutChartRow';
import GeneralInvestmentStatistics from './GeneralInvestmentStatistics';
import GeneralStatisticsGraph from './GeneralStatisticsGraph';
import InvestmentAndReturnBarCharts from './InvestmentAndReturnBarCharts';

const Overview = () => {
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
          <div className='col-sm-12'>
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
        <InvestmentAndReturnBarCharts />
      </div>
      <div className='row'>
        <PaymentStatusContainer />
      </div>
      <div className='row'>
        <FavoriteProjectCarousel />
      </div>
      <div className='row'>
        <SuggestedProjectsCarousel />
      </div>
    </>
  );
};

export default Overview;

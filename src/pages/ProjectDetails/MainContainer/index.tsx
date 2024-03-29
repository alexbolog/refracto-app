import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { ReactComponent as LeftArrow } from '../../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/refracto/arrow_right_alt-2.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HeaderCard } from './HeaderCard';
import { ExecutiveSummary } from './ExecutiveSummary';
import { NotConnected } from './NotConnected';
// import { useGetIsLoggedIn } from '@elrondnetwork/dapp-core/hooks';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { ProjectDetails } from './ProjectDetails';
import { Location } from './Location';
import { Sponsor } from './Sponsor';
import { SWOT } from './SWOT';
import { RefractoRating } from './RefractoRating';
import { CapitalStructure } from './CapitalStructure';
import { RepaymentSchedule } from './RepaymentSchedule';
import { Finances } from './Finances';
import { ProjectSpecs } from 'components/ProjectSpecs';
import { QandA } from './QandA';

export const MainContainer = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  const isConnected = useGetIsLoggedIn();

  const connectedComponents = () => {
    return (
      <>
        <div className='col-12'>
          <ProjectDetails project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <Location project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <Sponsor project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <SWOT project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <RefractoRating project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <CapitalStructure project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <RepaymentSchedule project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <Finances project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12'>
          <QandA project={project as FullProjectPageDetails} />
        </div>
      </>
    );
  };
  return (
    <>
      <div className='container-fluid p-0 w-100'>
        <div className='row'>
          <div className='col-12'>
            <HeaderCard project={project} />;
          </div>
          <div className='col-12 project-specs-floating-panel-mobile'>
            <ProjectSpecs project={project} />
          </div>
          <div className='col-12'>
            <ExecutiveSummary project={project} />;
          </div>
          {!isConnected ? (
            <div className='col-12'>
              <NotConnected />
            </div>
          ) : (
            connectedComponents()
          )}
        </div>
      </div>
    </>
  );
};

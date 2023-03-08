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
import { useGetIsLoggedIn } from '@elrondnetwork/dapp-core/hooks';
import { ProjectDetails } from './ProjectDetails';
import { Location } from './Location';
import { Sponsor } from './Sponsor';
import { SWOT } from './SWOT';
import { RefractoRating } from './RefractoRating';

export const MainContainer = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  const isConnected = useGetIsLoggedIn();

  const connectedComponents = () => {
    return (
      <>
        <div className='col-12 p-0'>
          <ProjectDetails project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12 p-0'>
          <Location project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12 p-0'>
          <Sponsor project={project as FullProjectPageDetails} />
        </div>
        <div className='col-12 p-0'>
          <SWOT project={project as FullProjectPageDetails} />
        </div>
        {/* <div className='col-12 p-0'>
          <RefractoRating project={project as FullProjectPageDetails} />
        </div> */}
      </>
    );
  };
  return (
    <>
      <div className='container-fluid p-0'>
        <div className='row w-100'>
          <div className='col-12 p-0'>
            <HeaderCard project={project} />;
          </div>
          <div className='col-12 p-0'>
            <ExecutiveSummary project={project} />;
          </div>
          {!isConnected ? (
            <div className='col-12 p-0'>
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

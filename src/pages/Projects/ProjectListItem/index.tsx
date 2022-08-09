import InvestModal from 'components/InvestModal';
import moment from 'moment';
import React from 'react';
import Modal from 'react-modal';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';

const ProjectListItem = ({ projectDetails }: { projectDetails: any }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const projInfoStyle = {
    backgroundColor: '#e6e6e6',
    border: '0px solid black',
    borderRadius: '5px'
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };
  const getExpectedDeadlineMonths = () => {
    return (projectDetails.deadline - moment.now()) / (30 * 24 * 3600 * 1000); // 30 days of 24 hrs, each made of 3600 * 1000 ms
  };

  const getRemainingPercentage = () => {
    return (1 - projectDetails.progress) * 100;
  };

  const getRemainingCrowdfundingAmount = () => {
    return (getRemainingPercentage() / 100) * projectDetails.crowdfundingTarget;
  };

  const handleOpenModal = async (e: any) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleNavigateToProject = () => {
    navigate(`${routeNames.projects}/${projectDetails.id}`);
  };

  return (
    <>
      <div className='row mb-1' style={projInfoStyle}>
        <div
          className='col-lg-1 d-flex justify-content-center align-items-center'
          onClick={handleNavigateToProject}
        >
          <img
            src={projectDetails.img}
            height='100px'
            width='100px'
            style={{ padding: '10px' }}
          />
        </div>
        <div className='col-lg-3 d-flex justify-content-left align-items-center mb-3'>
          <div className='ml-2'>
            <h6 className='mt-2'>
              {projectDetails.location}{' '}
              <img src={projectDetails.countryFlagImg} />
            </h6>
            <h3 onClick={handleNavigateToProject}>{projectDetails.name}</h3>
            <a href='#'>
              <h6>{projectDetails.projectOwner}</h6>
            </a>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h6>Crowdfunding target</h6>
            <h3>{projectDetails.crowdfundingTarget.toLocaleString()}$</h3>
            <ProgressBar
              data-tip={`${getRemainingCrowdfundingAmount().toLocaleString()}$ more needed`}
            >
              <ProgressBar
                now={projectDetails.progress * 100}
                variant='success'
                animated
                // label={`${projectDetails.progress * 100}%`}
              />
              <ProgressBar now={getRemainingPercentage()} variant='danger' />
            </ProgressBar>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h6>Duration</h6>
            <h3>
              {parseInt(getExpectedDeadlineMonths().toFixed()).toLocaleString()}{' '}
              months
            </h3>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h6>Forecasted APR</h6>
            <h3>{projectDetails.forecastedAPR}%</h3>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center mb-3'>
          {projectDetails.isLive && (
            <button className='btn btn-success mr-2' onClick={handleOpenModal}>
              Invest
            </button>
          )}
          {!projectDetails.isLive && (
            <button className='btn btn-success mr-2 disabled'>Invest</button>
          )}
          <button className='btn btn-primary'>Read more</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} style={modalStyles}>
        <InvestModal
          projectDetails={projectDetails}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
      <ReactTooltip />
    </>
  );
};

export default ProjectListItem;

import InvestModal from 'components/InvestModal';
import React from 'react';
import Modal from 'react-modal';

const ProjectListItem = ({ projectDetails }: { projectDetails: any }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
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

  const handleOpenModal = async (e: any) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  return (
    <>
      <div className='row mb-1' style={projInfoStyle}>
        <div className='col-lg-1'>
          <img
            src={projectDetails.img}
            height='100px'
            width='100px'
            style={{ padding: '10px' }}
          />
        </div>
        <div className='col-lg-3 d-flex justify-content-center align-items-center'>
          <div>
            <h3>{projectDetails.name}</h3>
            <a href='#'>
              <h6>{projectDetails.projectOwner}</h6>
            </a>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h3>{projectDetails.crowdfundingTarget.toLocaleString()}$</h3>
            <h6>Crowdfunding target</h6>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h3>{projectDetails.progress * 100}%</h3>
            <h6>Crowdfunding progress</h6>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
          <div>
            <h3>{projectDetails.forecastedAPR}%</h3>
            <h6>Forecasted APR</h6>
          </div>
        </div>
        <div className='col-lg-2 d-flex justify-content-center align-items-center'>
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
    </>
  );
};

export default ProjectListItem;

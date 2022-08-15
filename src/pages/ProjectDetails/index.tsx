import InvestmentProgressBar from 'components/InvestmentProgressBar';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import projectList from '../../db/projectList.json';
import InvestModal from 'components/InvestModal';
import Modal from 'react-modal';
import Description from 'components/Description';
import InvestmentCalculator from 'components/InvestmentCalculator';
import { NUMBER_OF_SHARES_PER_PROJECT } from 'config';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = React.useState<any>();
  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [pricePerShare, setPricePerShare] = React.useState(0);
  const [monthlyIncome, setMonthlyIncome] = React.useState(0);

  React.useEffect(() => {
    const existingProjectFilter = projectList.filter(
      (pl) => pl.id === parseInt(id || '-1')
    );
    if (existingProjectFilter.length === 0) {
      navigate('404');
    }
    setProjectInfo(existingProjectFilter[0]);
    setPricePerShare(
      existingProjectFilter[0].crowdfundingTarget / NUMBER_OF_SHARES_PER_PROJECT
    );
    // * 10 because it's * 1000 / 100
    // 1000 because 1000$ simulation investment amount
    // div 100 because forecastedApr is * 100
    setMonthlyIncome((existingProjectFilter[0].forecastedAPR * 10) / 12);
    setMounted(true);
  }, []);

  const imgStyle = {
    maxWidth: '90%',
    maxHeight: '90%'
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

  return !mounted ? null : (
    <div className='container'>
      <div className='row mt-2'>
        <div className='col-lg-6 col-md-12 mb-5'>
          <h1>{projectInfo.name}</h1>
          <h6>
            <a href='#'>{projectInfo.fullAddress}</a>
          </h6>
        </div>
      </div>
      {/* Gallery and key info row */}
      <div className='row'>
        {/* Gallery */}
        {/* TODO: rename img to mainImage in db */}
        {/* TODO: add array of images to each project */}
        {/* TODO: replace following img block with a gallery, zoom in/out, that shows all the array images */}
        <div className='col-lg-6 d-flex align-items-center'>
          <img src={projectInfo.img} style={imgStyle} />
        </div>
        {/* Key info, right col */}
        <div className='col-lg-6'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 d-flex justify-content-center mb-5'>
                <div>
                  <h2>
                    Project developer:{' '}
                    <a href='#'>{projectInfo.projectOwner}</a>
                  </h2>
                  <h6>
                    Developer&apos;s 1st project; {projectInfo.progress * 100}%
                    through reaching the{' '}
                    {projectInfo.crowdfundingTarget.toLocaleString()}$ goal
                  </h6>
                  <InvestmentProgressBar
                    crowdfundingTarget={projectInfo.crowdfundingTarget}
                    crowdfundingProgress={projectInfo.progress}
                  />
                </div>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>Risk Score</h6>
                  <h3>{projectInfo.riskScore}</h3>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>LTV</h6>
                  <h3>{projectInfo.ltv ?? 0}%</h3>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>Forecasted APR</h6>
                  <h3>{projectInfo.forecastedAPR ?? 0}%</h3>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>Asset class</h6>
                  <h3>{projectInfo.assetClass ?? 'Mall'}</h3>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>Investors</h6>
                  <h3>{projectInfo.investorsCount ?? 123}</h3>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6 d-flex justify-content-left align-items-center'>
                <div>
                  <h6>Crowdfunding deadline</h6>
                  <h3>{projectInfo.deadlineDate ?? '31 Nov 2022'}</h3>
                </div>
              </div>
              <div className='col-lg-12 d-flex justify-content-left align-items-center mt-4'>
                <button
                  className='btn btn-success btn-lg w-100'
                  onClick={() => setIsModalOpen(true)}
                >
                  Invest now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Key stats & map image */}
      <div className='row mt-5'>
        <div className='col-lg-6'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <h2>Project metrics</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <ul>
                  {projectInfo.attributes.map((a: any, index: number) => (
                    <li key={index}>
                      {a.key}: {a.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='col-lg-6 d-flex justify-content-center'> */}
        <div className='col-lg-6 d-flex justify-content-center'>
          <img src={projectInfo.locationMapSs} style={imgStyle} />
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <h2>Simulation</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              {/* TODO: check the math and extract the contract duration */}
              <h5>
                Investing 1000$ at the current {pricePerShare.toLocaleString()}$
                price per share would yield a monthly passive income of{' '}
                {monthlyIncome.toLocaleString()}$ for the next 32 months.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <InvestmentCalculator
            projectDetails={projectInfo}
            pricePerShare={pricePerShare}
          />
        </div>
      </div>
      {/* Description Row */}
      <div className='row mt-5'>
        <div className='col-lg-12'>
          <h2>About the project</h2>
        </div>
        <div className='col-lg-12'>
          <Description
            shortDescription={projectInfo.shortDescription}
            longDescription={projectInfo.longDescription}
          />
        </div>
      </div>
      {/* Project developer details */}
      <div className='row mt-5'>
        <div className='col-lg-12'>
          <h2>About the project developer</h2>
        </div>
        <div className='col-lg-12'>
          <Description
            shortDescription={projectInfo.shortDescription}
            longDescription={projectInfo.longDescription}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} style={modalStyles}>
        <InvestModal
          projectDetails={projectInfo}
          closeModal={() => setIsModalOpen(false)}
        />
      </Modal>
      <ReactTooltip />
    </div>
  );
};

export default ProjectDetails;

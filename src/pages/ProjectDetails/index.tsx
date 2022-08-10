import InvestmentProgressBar from 'components/InvestmentProgressBar';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { routeNames } from 'routes';
import projectList from '../../db/projectList.json';

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = React.useState<any>();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const existingProjectFilter = projectList.filter(
      (pl) => pl.id === parseInt(id || '-1')
    );
    if (existingProjectFilter.length === 0) {
      navigate('404');
    }
    setProjectInfo(existingProjectFilter[0]);
    setMounted(true);
  }, []);

  const imgStyle = {
    maxWidth: '90%',
    maxHeight: '90%'
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
        <div className='col-lg-6 col-md-12 d-flex justify-content-center mb-5'>
          <div>
            <h2>
              Project developer: <a href='#'>{projectInfo.projectOwner}</a>
            </h2>
            <h6>
              Is {projectInfo.progress * 100}% through reaching the{' '}
              {projectInfo.crowdfundingTarget.toLocaleString()}$ goal
            </h6>
            <InvestmentProgressBar
              crowdfundingTarget={projectInfo.crowdfundingTarget}
              crowdfundingProgress={projectInfo.progress}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 d-flex align-items-center'>
          <img src={projectInfo.img} style={imgStyle} />
        </div>
        <div className='col-lg-6'>
          <div className='container-fluid'>
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
                  <h6>Deadline</h6>
                  <h3>{projectInfo.deadlineDate ?? '31 Nov 2024'}</h3>
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
                  <h6>Deadline</h6>
                  <h3>{projectInfo.deadlineDate ?? '31 Nov 2024'}</h3>
                </div>
              </div>
              <div className='col-lg-12 d-flex justify-content-left align-items-center mt-4'>
                <button className='btn btn-success btn-lg w-100'>
                  Invest now!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};

export default ProjectDetails;

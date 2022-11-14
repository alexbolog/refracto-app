import InvestmentProgressBar from 'components/InvestmentProgressBar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';

const ProjectCard = ({
  imgSrc,
  projectTitle,
  projectFundingCrowdfunding,
  progress,
  projectId
}: {
  imgSrc: string;
  projectTitle: string;
  projectFundingCrowdfunding: number;
  progress: number;
  projectId: number;
}) => {
  const navigate = useNavigate();
  const handleNavigateToProject = () => {
    // navigate(`${routeNames.projects}/${projectId}`);
  };

  const imgStyle = {
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%'
  };

  return (
    <div
      className='card'
      onClick={handleNavigateToProject}
      style={{ margin: '20px' }}
    >
      <img src={imgSrc} className='card-img-top' style={imgStyle} />
      <div className='card-body'>
        <h5 className='card-title'>{projectTitle}</h5>
        <p className='card-text'>
          Funded amount: {projectFundingCrowdfunding.toLocaleString()}$
        </p>
        <InvestmentProgressBar
          crowdfundingTarget={projectFundingCrowdfunding}
          crowdfundingProgress={progress}
        />
      </div>
    </div>
  );
};

export default ProjectCard;

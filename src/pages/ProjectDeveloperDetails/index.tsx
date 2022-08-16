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
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import ProjectCard from 'components/ProjectCard';

const ProjectDeveloperDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [developerInfo, setDeveloperInfo] =
    React.useState<ProjectDeveloperInfo>();
  const [projectsCompletedCount, setProjectsCompletedCount] =
    React.useState(12);
  const [
    projectsCompletedOnRefractoCount,
    setProjectsCompletedOnRefractoCount
  ] = React.useState(5);
  const [activeProjects, setActiveProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    const existingProjectFilter = projectList.filter(
      (pl) => pl.projectOwnerId === parseInt(id || '-1')
    );
    if (existingProjectFilter.length === 0) {
      navigate('404');
    }
    const devInfo: ProjectDeveloperInfo = {
      name: existingProjectFilter[0].projectOwner,
      shortDescription: existingProjectFilter[0].shortProjectOwnerDetails,
      longDescription: existingProjectFilter[0].longProjectOwnerDetails,
      registrationDate: '21 Nov 2001',
      companyLocation: 'Random address, Random, RA',
      registrationNumber: '12315124',
      companyLogoImgSrc:
        'https://www.logodesign.net/logo-new/under-construction-buildings-inside-shield-emblem-729ld.png',
      allProjects: [],
      allProjectsOnRefracto: [],
      companyCapital: 1500000
    };
    setDeveloperInfo(devInfo);
  }, []);

  React.useEffect(() => {
    setActiveProjects(projectList);
  }, []);

  const imgStyle = {
    maxWidth: '90%',
    maxHeight: '90%'
  };

  return !developerInfo ? null : (
    <div className='container'>
      {/* Top row,  */}
      <div className='row mt-2'>
        <div className='col-lg-6 col-md-12 mb-5'>
          {/* top row, left column */}
          <div className='container-fluid mt-4'>
            <div className='row'>
              <div className='col-lg-12 col-md-12'>
                <div>
                  <h1>{developerInfo.name}</h1>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12 col-md-12 mt-2'>
                <span>Established: {developerInfo.registrationDate}</span>
              </div>
              <div className='col-lg-12 col-md-12 mt-2'>
                <span>Headquarters: {developerInfo.companyLocation}</span>
              </div>
              <div className='col-lg-12 col-md-12 mt-2'>
                <span>
                  Net worth: {developerInfo.companyCapital.toLocaleString()}$
                </span>
              </div>
              <div className='col-lg-12 col-md-12 mt-2'>
                <span>Projects completed:</span>{' '}
                <Link to='#' target={'_blank'}>
                  {projectsCompletedCount}
                </Link>
              </div>
              <div className='col-lg-12 col-md-12 mt-2'>
                <span>
                  Projects completed on Refracto:{' '}
                  <Link to='#' target={'_blank'}>
                    {projectsCompletedOnRefractoCount}
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* top row, right column */}
        <div className='col-lg-6 d-flex justify-content-right'>
          <img src={developerInfo.companyLogoImgSrc} style={imgStyle} />
        </div>
      </div>
      {/* Gallery and key info row */}
      <div className='row'>
        <div className='col-lg-12 col-md-12' id='description'>
          <h2>About the project developer</h2>
        </div>
        <div className='col-lg-12 col-md-12'>
          <Description
            shortDescription={developerInfo.shortDescription}
            longDescription={developerInfo.longDescription}
            targetId={'description'}
          />
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-lg-12 col-md-12'>
          <h2>Projects open for investing</h2>
        </div>
        <div className='row mt-2'>
          {activeProjects.map((ap: any, index: number) => (
            <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
              <ProjectCard
                projectId={ap.id}
                imgSrc={ap.img}
                projectTitle={ap.name}
                projectFundingCrowdfunding={ap.crowdfundingTarget}
                progress={ap.progress}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col-lg-12 col-md-12'>
          <h2>Funded projects</h2>
        </div>
      </div>
      <div className='row mt-2'>
        {activeProjects.map((ap: any, index: number) => (
          <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
            <ProjectCard
              projectId={ap.id}
              imgSrc={ap.img}
              projectTitle={ap.name}
              projectFundingCrowdfunding={ap.crowdfundingTarget}
              progress={1}
            />
          </div>
        ))}
      </div>
      <div className='row mt-5'>
        <div className='col-lg-12 col-md-12'>
          <h2>Past completed projects</h2>
        </div>
      </div>
      <div className='row mt-2'>
        {activeProjects.map((ap: any, index: number) => (
          <div className='col-lg-3 col-md-4 col-sm-6' key={index}>
            <ProjectCard
              projectId={ap.id}
              imgSrc={ap.img}
              projectTitle={ap.name}
              projectFundingCrowdfunding={ap.crowdfundingTarget}
              progress={1}
            />
          </div>
        ))}
      </div>
      <ReactTooltip />
    </div>
  );
};

export default ProjectDeveloperDetails;

interface ProjectDeveloperInfo {
  name: string;
  shortDescription: string;
  longDescription: string;
  registrationDate: string;
  registrationNumber: string;
  allProjects: any[];
  allProjectsOnRefracto: any[];
  companyLocation: string;
  companyLogoImgSrc: string;
  companyCapital: number;
}

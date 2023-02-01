import React from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';
import ProjectCardItem from './ProjectCardItem';
import { Carousel, Stack } from 'react-bootstrap';
import { FavoriteProject, SuggestedProject } from 'types/accountTypes';

const ProjectCardCarousel = ({
  title,
  projects,
  isFavoritesOnly
}: {
  title: string;
  projects: SuggestedProject[];
  isFavoritesOnly: boolean;
}) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  const splitProjectList = () => {
    const isMobile = width <= 768;
    const chunkSize = isMobile ? 2 : 4;
    const chunks = [];
    for (let i = 0; i < projects.length; i += chunkSize) {
      const chunk = projects.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const [carouselStartIndex, setCarouselStartIndex] = React.useState(0);
  const [projectItemChunks, _] = React.useState<any[]>(splitProjectList());
  const handleToggleFavorite = (projectId: string, isFavorite: boolean) => {
    window.alert(`${projectId} is favorite: ${isFavorite}`);
  };
  const toggleCarousel = (step: number) => {
    const newStartIndex = carouselStartIndex + step;
    if (newStartIndex < 0 || newStartIndex > projectItemChunks.length) {
      return;
    }
    setCarouselStartIndex(newStartIndex);
  };
  return (
    <>
      <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-between'>
        <div>
          <h3>
            <strong>{title}</strong>
          </h3>
        </div>
        <div>
          {projects.length > 4 && (
            <>
              <button
                style={{
                  background: 'white',
                  borderRadius: '0.625rem',
                  border: '1px #D5DFE7 solid',
                  padding: '0.5rem',
                  marginRight: '10px'
                }}
                onClick={() => toggleCarousel(-1)}
              >
                <LeftArrow />
              </button>
              <button
                style={{
                  background: 'white',
                  borderRadius: '0.625rem',
                  border: '1px #D5DFE7 solid',
                  padding: '0.5rem'
                }}
                onClick={() => toggleCarousel(1)}
              >
                <RightArrow />
              </button>
            </>
          )}
        </div>
      </div>
      <div className='col-lg-12 col-sm-12 col-md-12 mt-3 container-fluid p-0 w-100'>
        <Carousel activeIndex={carouselStartIndex} className='row'>
          {projectItemChunks.map((project, i) => (
            <Carousel.Item key={`favorite-project-${i}-${project[0].id}`}>
              <Stack direction='horizontal' className='h-100'>
                <ProjectCardItem
                  className='col-lg-3 col-md-6 col-sm-6'
                  projectDetails={project[0]}
                  onToggleFavorite={handleToggleFavorite}
                  isButtonOutline={!isFavoritesOnly}
                  buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                />
                {project.length > 1 ? (
                  <ProjectCardItem
                    className='col-lg-3 col-md-6 col-sm-6'
                    projectDetails={project[1]}
                    onToggleFavorite={handleToggleFavorite}
                    isButtonOutline={!isFavoritesOnly}
                    buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                  />
                ) : (
                  <div className='col-lg-3 col-md-6 col-sm-6'></div>
                )}
                {project.length > 2 ? (
                  <ProjectCardItem
                    className='col-lg-3 col-md-6 col-sm-6'
                    projectDetails={project[2]}
                    onToggleFavorite={handleToggleFavorite}
                    isButtonOutline={!isFavoritesOnly}
                    buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                  />
                ) : (
                  <div className='col-lg-3 col-md-6 col-sm-6'></div>
                )}
                {project.length > 3 ? (
                  <ProjectCardItem
                    className='col-lg-3 col-md-6 col-sm-6'
                    projectDetails={project[3]}
                    onToggleFavorite={handleToggleFavorite}
                    isButtonOutline={!isFavoritesOnly}
                    buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                  />
                ) : (
                  <div className='col-lg-3 col-md-6 col-sm-6'></div>
                )}
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProjectCardCarousel;

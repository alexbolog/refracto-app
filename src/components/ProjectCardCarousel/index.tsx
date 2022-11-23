import React from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';
import ProjectCardItem from './ProjectCardItem';

const ProjectCardCarousel = ({
  title,
  projects,
  isFavoritesOnly
}: {
  title: string;
  projects: any[];
  isFavoritesOnly: boolean;
}) => {
  const [carouselStartIndex, setCarouselStartIndex] = React.useState(0);
  const handleToggleFavorite = (projectId: number, isFavorite: boolean) => {
    window.alert(`${projectId} is favorite: ${isFavorite}`);
  };
  const toggleCarousel = (step: number) => {
    const newStartIndex = carouselStartIndex + step;
    if (newStartIndex < 0 || newStartIndex > projects.length - 4) {
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
      <div className='col-lg-12 col-sm-12 col-md-12 mt-3 row'>
        {projects.map(
          (project, i) =>
            i >= carouselStartIndex &&
            i <= carouselStartIndex + 3 && (
              <div
                className='col-lg-3 col-md-6 col-sm-6'
                key={`favorite-project-${i}-${project.id}`}
              >
                <ProjectCardItem
                  projectDetails={project}
                  onToggleFavorite={handleToggleFavorite}
                  isButtonOutline={!isFavoritesOnly}
                  buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default ProjectCardCarousel;

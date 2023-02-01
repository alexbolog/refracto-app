import React from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';
import ProjectCardItem from './ProjectCardItem';
import { SuggestedProject } from 'types/accountTypes';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  // const [projectItemChunks, _] = React.useState<SuggestedProject[][]>(
  //   splitProjectList()
  // );
  const handleToggleFavorite = (projectId: string, isFavorite: boolean) => {
    window.alert(`${projectId} is favorite: ${isFavorite}`);
  };
  const toggleCarousel = (step: number) => {
    const carouselId = isFavoritesOnly ? 'fav-swiper' : 'sgst-swiper';
    if (step === -1) {
      const elements = document.getElementsByClassName('swiper-button-prev');
      for (let i = 0; i < elements.length; i++) {
        const parentId = elements[i].parentElement?.id;
        if (parentId === carouselId) {
          const el = elements[i] as HTMLInputElement;
          el.click();
        }
      }
    } else {
      const elements = document.getElementsByClassName('swiper-button-next');
      for (let i = 0; i < elements.length; i++) {
        const parentId = elements[i].parentElement?.id;
        if (parentId === carouselId) {
          const el = elements[i] as HTMLInputElement;
          el.click();
        }
      }
    }
  };

  return (
    <div className='container w-100'>
      <div className='row'>
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
        <div className='col-12 mt-3'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={width <= 768 ? 1 : 4}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            id={isFavoritesOnly ? 'fav-swiper' : 'sgst-swiper'}
          >
            {projects.map((project, i) => (
              <SwiperSlide
                key={`${isFavoritesOnly ? 'fav' : 'sgg'}-slide-item-${i}`}
              >
                <ProjectCardItem
                  projectDetails={project}
                  onToggleFavorite={handleToggleFavorite}
                  isButtonOutline={!isFavoritesOnly}
                  buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-between'>
  //       <div>
  //         <h3>
  //           <strong>{title}</strong>
  //         </h3>
  //       </div>
  //       <div>
  //         {projects.length > 4 && (
  //           <>
  //             <button
  //               style={{
  //                 background: 'white',
  //                 borderRadius: '0.625rem',
  //                 border: '1px #D5DFE7 solid',
  //                 padding: '0.5rem',
  //                 marginRight: '10px'
  //               }}
  //               onClick={() => toggleCarousel(-1)}
  //             >
  //               <LeftArrow />
  //             </button>
  //             <button
  //               style={{
  //                 background: 'white',
  //                 borderRadius: '0.625rem',
  //                 border: '1px #D5DFE7 solid',
  //                 padding: '0.5rem'
  //               }}
  //               onClick={() => toggleCarousel(1)}
  //             >
  //               <RightArrow />
  //             </button>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //     <div className='col-lg-12 col-sm-12 col-md-12 mt-3'>
  //       {/* <div className='container-fluid p-0 w-100'>
  //         <Carousel
  //           activeIndex={carouselStartIndex}
  //           className='row w-100'
  //           indicators={false}
  //           controls={false}
  //         >
  //           {projectItemChunks.map((project, i) => (
  //             <Carousel.Item key={`favorite-project-${i}-${project[0].id}`} className='w-100'>
  //               <Stack direction='horizontal' className='h-100 justify-content-center align-items-center'>
  //                 <ProjectCardItem
  //                   className='col-lg-3 col-md-6 col-sm-6 w-100'
  //                   projectDetails={project[0]}
  //                   onToggleFavorite={handleToggleFavorite}
  //                   isButtonOutline={!isFavoritesOnly}
  //                   buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
  //                 />
  //                 {project.length > 1 ? (
  //                   <ProjectCardItem
  //                     className='col-lg-3 col-md-6 col-sm-6'
  //                     projectDetails={project[1]}
  //                     onToggleFavorite={handleToggleFavorite}
  //                     isButtonOutline={!isFavoritesOnly}
  //                     buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
  //                   />
  //                 ) : (
  //                   <div className='col-lg-3 col-md-6 col-sm-6'></div>
  //                 )}
  //                 {project.length > 2 ? (
  //                   <ProjectCardItem
  //                     className='col-lg-3 col-md-6 col-sm-6'
  //                     projectDetails={project[2]}
  //                     onToggleFavorite={handleToggleFavorite}
  //                     isButtonOutline={!isFavoritesOnly}
  //                     buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
  //                   />
  //                 ) : (
  //                   <div className='col-lg-3 col-md-6 col-sm-6'></div>
  //                 )}
  //                 {project.length > 3 ? (
  //                   <ProjectCardItem
  //                     className='col-lg-3 col-md-6 col-sm-6'
  //                     projectDetails={project[3]}
  //                     onToggleFavorite={handleToggleFavorite}
  //                     isButtonOutline={!isFavoritesOnly}
  //                     buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
  //                   />
  //                 ) : (
  //                   <div className='col-lg-3 col-md-6 col-sm-6'></div>
  //                 )}
  //               </Stack>
  //             </Carousel.Item>
  //           ))}
  //         </Carousel>
  //       </div> */}

  //       <div className='bg-dark bg-opacity-25 container-fluid'>
  //         <Carousel style={{ height: 500 }}>
  //           {projectItemChunks.length > 0 &&
  //             projectItemChunks.map((chunk, index) => {
  //               console.log(chunk);
  //               return (
  //                 <Carousel.Item
  //                   style={{ height: 500 }}
  //                   key={`carousel-${
  //                     isFavoritesOnly ? 'fav' : 'sgst'
  //                   }-${index}`}
  //                 >
  //                   <Stack
  //                     direction='horizontal'
  //                     className='h-100 justify-content-center align-items-center'
  //                     gap={3}
  //                   >
  //                     {/* <Card style={{ width: '18rem' }}>
  //                     <Card.Body>
  //                       <Card.Title>Card Title</Card.Title>
  //                       <Card.Text>
  //                         Some quick example text to build on the card title and
  //                         make up the bulk of the card's content.
  //                       </Card.Text>
  //                       <Button variant='primary'>
  //                         Go somewhere {review[0]._id}
  //                       </Button>
  //                     </Card.Body>
  //                   </Card>

  //                   <Card style={{ width: '18rem' }}>
  //                     <Card.Body>
  //                       <Card.Title>Card Title</Card.Title>
  //                       <Card.Text>
  //                         Some quick example text to build on the card title and
  //                         make up the bulk of the card's content.
  //                       </Card.Text>
  //                       <Button variant='primary'>
  //                         Go somewhere {review[1]._id}
  //                       </Button>
  //                     </Card.Body>
  //                   </Card>

  //                   <Card style={{ width: '18rem' }}>
  //                     <Card.Body>
  //                       <Card.Title>Card Title</Card.Title>
  //                       <Card.Text>
  //                         Some quick example text to build on the card title and
  //                         make up the bulk of the card's content.
  //                       </Card.Text>
  //                       <Button variant='primary'>
  //                         Go somewhere {review[2]._id}
  //                       </Button>
  //                     </Card.Body>
  //                   </Card> */}
  //                     <h1>{chunk[0]?.projectId}</h1>
  //                     <h1>{chunk.length > 0 && chunk[1]?.projectId}</h1>
  //                     <h1>{chunk.length > 1 && chunk[2]?.projectId}</h1>
  //                     <h1>{chunk.length > 2 && chunk[3]?.projectId}</h1>
  //                   </Stack>
  //                 </Carousel.Item>
  //               );
  //             })}
  //         </Carousel>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default ProjectCardCarousel;

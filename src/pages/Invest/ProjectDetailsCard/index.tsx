import React from 'react';
import { ProjectPageDetails } from 'types/projectTypes';
import { ImageGallery } from 'components/ImageGallery';
import { toLocaleStringOptions } from 'config';
import { formatRelativeDate, fromIso } from 'utils';
import { SocialButtons } from './SocialButtons';

export const ProjectDetailsCard = ({
  projectDetails
}: {
  projectDetails: ProjectPageDetails;
}) => {
  return (
    <div className='card'>
      <div className='card-header p-0 m-0'>
        <ImageGallery images={projectDetails.images} roundedTop />
        <SocialButtons />
      </div>
      <div className='card-body'>
        <div className='container-fluid w-100 p-0 m-0'>
          <div className='row p-0'>
            <div className='col-12'>
              <h1>{projectDetails.projectTitle}</h1>
            </div>
            <div className='col-12'>
              <h5>{projectDetails.shortDescription}</h5>
            </div>
          </div>
          <div className='row p-0 main-info'>
            <div className='col-4 sep'>
              <div className='important text-primary'>
                {(projectDetails.returnPercentage * 100).toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
                % p.a.
              </div>
              <div>Return</div>
            </div>
            <div className='col-4 sep'>
              <div className='important text-primary'>
                {formatRelativeDate(fromIso(projectDetails.loanDeadline))}
              </div>
              <div>Term</div>
            </div>
            <div className='col-4'>
              <div className='important text-primary'>
                {formatRelativeDate(
                  fromIso(projectDetails.crowdfundingDeadline)
                )}
              </div>
              <div>To invest</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

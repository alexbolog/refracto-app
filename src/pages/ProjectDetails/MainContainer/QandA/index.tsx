import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';

export const QandA = ({ project }: { project: FullProjectPageDetails }) => {
  const qandaFirst = project.questionsAndAnswers.filter((q) => q.id === '1')[0];
  return (
    <MobileCollapsibleSection
      header='Q&A'
      body={
        <div className='container-fluid w-100 p-0'>
          <div className='row'>
            <div className='col-lg-2'>
              <img src={qandaFirst.ownerImgSrc} className='rounded-circle' />
            </div>
            <div className='col-lg-10'>
              lol
            </div>
          </div>
        </div>
      }
    />
  );
};

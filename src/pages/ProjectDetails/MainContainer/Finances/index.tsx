import { toLocaleStringOptions } from 'config';
import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import './style.css';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';

export const Finances = ({ project }: { project: FullProjectPageDetails }) => {
  const expectedPayout = ((project.returnPercentage * 1000) / 12) * 9;
  return (
    <MobileCollapsibleSection
      header='Finances'
      body={
        <>
          <h6>
            {project.financingDetails.split('<br />').map((str) => (
              <>
                {str}
                <br />
              </>
            ))}
          </h6>
          <div className='example'>
            <strong>Example</strong>
            <br />
            <br />
            Investment: 1,000 EUR. <br />
            <br />
            <br />
            Expected payout after 9 months (principal and interest) to
            investors:{' '}
            {(expectedPayout + 1000).toLocaleString(
              undefined,
              toLocaleStringOptions
            )}{' '}
            EUR, including 1,000 EUR principal and{' '}
            {expectedPayout.toLocaleString(undefined, toLocaleStringOptions)}{' '}
            EUR interest.
          </div>
        </>
      }
    />
  );
};

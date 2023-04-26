import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from './MobileCollapsibleSection';

export const SWOT = ({ project }: { project: FullProjectPageDetails }) => {
  return (
    <MobileCollapsibleSection
      header='SWOT'
      body={
        <>
          <div className='swot-wrapper'>
            <div className='swot-cell strenghts'>
              <h3 className='title'>Strengths</h3>
              <ul>
                {project.swotAnalysis.strengths.map((sa, idx) => (
                  <li key={`swot-analysis-strengths_${idx}`}>{sa}</li>
                ))}
              </ul>
            </div>
            <div className='swot-cell weaknesses'>
              <h3 className='title'>Weaknesses</h3>
              <ul>
                {project.swotAnalysis.weaknesses.map((sa, idx) => (
                  <li key={`swot-analysis-weaknesses_${idx}`}>{sa}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='swot-wrapper'>
            <div className='swot-cell opportunities'>
              <h3 className='title'>Opportunities</h3>
              <ul>
                {project.swotAnalysis.opportunities.map((sa, idx) => (
                  <li key={`swot-analysis-opportunities_${idx}`}>{sa}</li>
                ))}
              </ul>
            </div>
            <div className='swot-cell threats'>
              <h3 className='title'>Threats</h3>
              <ul>
                {project.swotAnalysis.threats.map((sa, idx) => (
                  <li key={`swot-analysis-threats_${idx}`}>{sa}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      }
    />
  );
};

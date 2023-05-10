import * as React from 'react';
import ProjectInvestmentEvent from '../../../types/projectInvestmentEvent';
import { useGetProjectInvestmentHistory } from '../../../contexts/InvestmentHistory/hooks/useGetProjectInvestmentHistory';

const InvestmentAndReturnBarCharts = () => {
  const projectInvestments: ProjectInvestmentEvent[] =
    useGetProjectInvestmentHistory();
  return (
    <div className='col-sm-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Investments and Returns</h3>
        </div>
        {projectInvestments.map((projectInvestment: ProjectInvestmentEvent) => (
          <p key={projectInvestment.projectId}>{projectInvestment.projectId}</p>
        ))}
      </div>
    </div>
  );
};

export default InvestmentAndReturnBarCharts;

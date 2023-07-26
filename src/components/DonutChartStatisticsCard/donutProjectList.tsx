import {ActiveProjectInvestment} from '../../types/projectTypes';
import {toLocaleStringOptions} from '../../config';
import React from 'react';

const DonutProjectList = ({
  chartData,
  activeProjectInvestments,
  expanded
}: {
  chartData: {
    datasets: {
      backgroundColor: string[] | undefined;
      data: number[] | undefined;
    }[];
    labels: string[] | undefined;
  };
  activeProjectInvestments: ActiveProjectInvestment[] | undefined;
  expanded: boolean;
}) => {
  const getList = React.useCallback(() => {
    const labels = expanded
      ? chartData?.labels
      : chartData?.labels?.slice(0, 5);
    return labels?.map((label, idx) => {
      const color = chartData?.datasets[0].backgroundColor?.[idx];
      const roi =
        activeProjectInvestments![idx].returnPercentage.toLocaleString(
          undefined,
          toLocaleStringOptions
        ) + '%';
      const invested =
        '€' +
        activeProjectInvestments![idx].amountInvested.toLocaleString(
          undefined,
          toLocaleStringOptions
        );
      return (
        <div className='row' key={idx}>
          <div
            className='col color-box p-0 col-1 mt-auto mb-auto'
            style={{
              backgroundColor: color
            }}
          ></div>
          <div className='col col-xl-5 col-11'>{label}</div>
          <div className='col col-4 col-xl-3'>{roi}</div>
          <div className='col invested-number col-8 col-xl-3 text-blugray-4'>
            {invested}
          </div>
        </div>
      );
    });
  }, [expanded]);

  return (
    <>
      <h4>
        <strong>Projects</strong>
      </h4>
      <div className='projects-list container ml-3 mt-2'>{getList()}</div>
    </>
  );
};

export default DonutProjectList;

import React from 'react';
import { toLocaleStringOptions } from '../../config';
import { Investment } from '../../types/accountTypes';

const DonutProjectList = ({
  investments,
  expanded
}: {
  investments: Investment[] | undefined;
  expanded: boolean;
}) => {
  const getList = React.useCallback(() => {
    const allLabels = investments?.map((pl) => pl?.projectInfo?.projectTitle);
    const labels = expanded ? allLabels : allLabels?.slice(0, 5);
    return labels?.map((label, idx) => {
      const color = investments![idx].projectInfo?.colorCodeHex;
      const roi =
        (investments![idx].projectInfo.returnPercentage * 100).toLocaleString(
          undefined,
          toLocaleStringOptions
        ) + '%';
      const invested =
        '€' +
        investments![idx].projectInfo.crowdfundedAmount.toLocaleString(
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

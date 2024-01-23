import React from 'react';
import { AccountContext } from 'contexts/AccountContext';
import { useContext, useState } from 'react';
import ProjectInfo from './ProjectInfo';
import './style.css';

const ProjectList = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const COLLAPSE_BREAK_POINT = 1000;
  const { accountOverview, isLoading } = useContext(AccountContext);
  const shouldShowBorder = (index: number) => {
    return isCollapsed
      ? index < COLLAPSE_BREAK_POINT
      : index < (accountOverview?.investments?.length ?? 0) - 1;
  };

  return accountOverview?.investments === undefined || isLoading ? null : (
    <div className='card w-100'>
      <div className='card-body container-fluid w-100 project-list-container'>
        {accountOverview.investments.map((p, i) =>
          i > 4 && isCollapsed ? null : (
            <ProjectInfo
              hasBorder={shouldShowBorder(i)}
              investmentData={p}
              key={`active-project-investment-${i}`}
            />
          )
        )}
      </div>
      {/* <div className='card-footer'>Expand footer</div> */}
    </div>
  );
};

export default ProjectList;

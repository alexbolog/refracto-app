import React from 'react';
import { GeneralContext } from 'contexts/GeneralContext';
import { useContext, useState } from 'react';
import ProjectInfo from './ProjectInfo';
import './style.css';

const ProjectList = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const COLLAPSE_BREAK_POINT = 4;
  const { activeProjectInvestments, isLoading } = useContext(GeneralContext);
  const shouldShowBorder = (index: number) => {
    return isCollapsed
      ? index < COLLAPSE_BREAK_POINT
      : index < (activeProjectInvestments?.length ?? 0) - 1;
  };

  return activeProjectInvestments === undefined || isLoading ? null : (
    <div className='card w-100'>
      <div className='card-body container-fluid w-100 project-list-container'>
        {activeProjectInvestments.map((p, i) =>
          i > 4 && isCollapsed ? null : (
            <ProjectInfo
              hasBorder={shouldShowBorder(i)}
              projectData={p}
              key={`active-project-investment-${i}`}
            />
          )
        )}
      </div>
      <div className='card-footer'>Expand footer</div>
    </div>
  );
};

export default ProjectList;

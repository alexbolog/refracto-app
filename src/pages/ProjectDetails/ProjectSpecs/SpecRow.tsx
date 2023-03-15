import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const SpecRow = ({
  icon,
  leftSideComponent,
  rightSideComponent
}: {
  icon?: IconDefinition;
  leftSideComponent: JSX.Element;
  rightSideComponent: JSX.Element;
}) => {
  return (
    <div className='project-details-row'>
      <div className='left-side'>
        {icon && <FontAwesomeIcon icon={icon} className='icon text-primary' />}
        {leftSideComponent}
      </div>
      <div className='right-side'>{rightSideComponent}</div>
    </div>
  );
};

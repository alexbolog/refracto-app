import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { getIsMobile } from 'utils';

export const MobileCollapsibleSection = ({
  header,
  body
}: {
  header: string;
  body: JSX.Element;
}) => {
  const isMobile = getIsMobile();
  // start with each container collapsed if view is mobile
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <div className={`card project-details-card-wrapper ${isCollapsed && 'collapsed'}`}>
      <div className='card-header'>
        <h1>{header}</h1>
        <button
          className='btn btn-social btn-collapse'
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed && <FontAwesomeIcon icon={faChevronDown} />}
          {!isCollapsed && <FontAwesomeIcon icon={faChevronUp} />}
        </button>
      </div>
      <div className={`card-body ${isCollapsed && 'd-none'}`}>{body}</div>
    </div>
  );
};

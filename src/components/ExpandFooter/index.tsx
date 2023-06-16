import { ReactComponent as ExpandIcon } from '../../assets/icons/refracto/arrow_right_alt.svg';
import * as React from 'react';

import './style.scss';

const ExpandFooter = ({
  onExpandToggle,
  analyticsEvent = 'expand'
}: {
  onExpandToggle?: () => void;
  analyticsEvent?: string;
}) => {
  const onExpand = () => {
    // TODO: add Google Analytics
    // TODO: add Animation
    if (onExpandToggle) {
      onExpandToggle();
    }
  };

  return (
    <div
      className='card-footer d-flex justify-content-end expand-footer-spacings'
      onClick={onExpand}
    >
      <p className='text-primary expand-footer-text'>
        Expand <ExpandIcon />
      </p>
    </div>
  );
};

export default ExpandFooter;

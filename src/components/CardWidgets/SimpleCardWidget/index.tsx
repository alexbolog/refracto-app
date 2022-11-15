import React from 'react';
import ReactTooltip from 'react-tooltip';
import { ReactComponent as InfoIcon } from '../../../assets/icons/refracto/info.svg';

const SimpleCardWidget = ({
  title,
  content,
  infoMessage
}: {
  title: string;
  content: string;
  infoMessage: string;
}) => {
  return (
    <div className='widget-stat card'>
      <div className='card-body p-4'>
        <div className='media'>
          <div className='media-body'>
            <div className='d-flex justify-content-between'>
              <p className='mb-1'>{title}</p>
              <InfoIcon style={{ cursor: 'pointer' }} data-tip={infoMessage} />
            </div>
            <h3>{content}</h3>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  );
};
export default SimpleCardWidget;

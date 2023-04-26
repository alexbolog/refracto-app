import React from 'react';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialButtons = () => {
  return (
    <>
      <button className='btn btn-social fb bottom'>
        <FontAwesomeIcon icon={faFacebook as any} />
      </button>
      <button className='btn btn-social twt bottom'>
        <FontAwesomeIcon icon={faTwitter as any} />
      </button>
    </>
  );
};

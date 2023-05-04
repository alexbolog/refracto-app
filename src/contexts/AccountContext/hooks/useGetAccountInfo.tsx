import React, { useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';

const useGetProfileInfo = () => {
  const getAccountInfo = (): ProfileInfo => {
    return {
      firstName: 'Leona',
      lastName: 'Pop',
      profilePictureSrc: 'user.png'
    };
  };

  const [accountInfo, setAccountInfo] = useState<ProfileInfo>(getAccountInfo());

  return accountInfo;
};

export default useGetProfileInfo;

import React, { useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

const useGetProfileInfo = () => {
  const { address } = useGetAccountInfo();
  const getAccountInfo = (): ProfileInfo => {
    return {
      // firstName: 'Leona',
      // lastName: 'Pop',
      firstName: `erd1..${address.slice(-4)}`,
      lastName: '',
      profilePictureSrc: 'user.png'
    };
  };

  const [accountInfo, setAccountInfo] = useState<ProfileInfo>(getAccountInfo());

  return accountInfo;
};

export default useGetProfileInfo;

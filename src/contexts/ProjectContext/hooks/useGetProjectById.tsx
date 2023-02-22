import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { getFullProjectInfo, getProjectInfo } from 'apiRequests/backend';
import React from 'react';
import { ProjectPageDetails, FullProjectPageDetails } from 'types/projectTypes';

const useGetProjectById = () => {
  const { account: address } = useGetAccountInfo();

  const getProjectById = async (
    projectId: string
  ): Promise<ProjectPageDetails | FullProjectPageDetails> => {
    const isLoggedIn = Boolean(address);
    if (isLoggedIn) {
      return getFullProjectInfo(projectId);
    }
    return getProjectInfo(projectId);
  };

  return getProjectById;
};

export default useGetProjectById;

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { getFullProjectInfo, getProjectInfo } from 'apiRequests/backend';
import React from 'react';
import { ProjectPageDetails, FullProjectPageDetails } from 'types/projectTypes';

const useGetProjectById = () => {
  const { account: address } = useGetAccountInfo();

  const getProjectById = async (
    projectId: string
  ): Promise<ProjectPageDetails | FullProjectPageDetails | undefined> => {
    const isLoggedIn = Boolean(address);
    if (isLoggedIn) {
      return getFullProjectInfo(projectId);
    }
    return getProjectInfo(projectId);
  };

  return getProjectById;
};

export default useGetProjectById;

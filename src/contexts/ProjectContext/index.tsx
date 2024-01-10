import React from 'react';
import {
  FullProjectPageDetails,
  MarketplaceListing,
  ProjectListItem
} from 'types/projectTypes';
import useGetProjects from './hooks/useGetProjects';
import useGetMarketplaceProjects from './hooks/useGetMarketplaceProjects';
import { getFullProjectInfo } from 'apiRequests/backend';

export interface IProjectContext {
  marketplaceProjects: MarketplaceListing[];
  getProjectById: (
    projectId: number
  ) => Promise<FullProjectPageDetails | undefined>;
  getProjectByLoanShareNonce: (nonce: number) => ProjectListItem | undefined;
}

const defaultState: IProjectContext = {
  marketplaceProjects: [],
  getProjectById: async (_) => undefined,
  getProjectByLoanShareNonce: (_) => undefined
};

export const ProjectContext =
  React.createContext<IProjectContext>(defaultState);

export const ProjectContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { activeProjects } = useGetProjects();
  const marketplaceProjects = useGetMarketplaceProjects();

  const getProjectById = async (
    projectId: number
  ): Promise<FullProjectPageDetails | undefined> => {
    return await getFullProjectInfo(projectId);
  };

  const getProjectByLoanShareNonce = (
    nonce: number
  ): ProjectListItem | undefined => {
    return activeProjects.find((p) => p.tokenNonce === nonce);
  };

  return (
    <ProjectContext.Provider
      value={{
        marketplaceProjects,
        getProjectById,
        getProjectByLoanShareNonce
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

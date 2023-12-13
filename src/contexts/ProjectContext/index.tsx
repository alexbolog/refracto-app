import React from 'react';
import {
  FullProjectPageDetails,
  MarketplaceListing,
  ProjectListItem
} from 'types/projectTypes';
import useGetAvailableProjects from './hooks/useGetAvailableProjects';
import useGetMarketplaceProjects from './hooks/useGetMarketplaceProjects';
import { getFullProjectInfo } from 'apiRequests/backend';

export interface IProjectContext {
  availableProjects: ProjectListItem[];
  marketplaceProjects: MarketplaceListing[];
  getProjectById: (
    projectId: number
  ) => Promise<FullProjectPageDetails | undefined>;
  getProjectByLoanShareNonce: (nonce: number) => ProjectListItem | undefined;
}

const defaultState: IProjectContext = {
  availableProjects: [],
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
  const dbProjects = useGetAvailableProjects();
  const marketplaceProjects = useGetMarketplaceProjects();

  const getProjectById = async (
    projectId: number
  ): Promise<FullProjectPageDetails | undefined> => {
    return await getFullProjectInfo(projectId);
  };

  const getProjectByLoanShareNonce = (
    nonce: number
  ): ProjectListItem | undefined => {
    return dbProjects.find((p) => p.tokenNonce === nonce);
  };

  return (
    <ProjectContext.Provider
      value={{
        availableProjects: dbProjects,
        marketplaceProjects,
        getProjectById,
        getProjectByLoanShareNonce
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

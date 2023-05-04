import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import useGetAvailableProjects from './hooks/useGetAvailableProjects';
import useGetMarketplaceProjects from './hooks/useGetMarketplaceProjects';

export interface IProjectContext {
  isLoading: boolean;
  availableProjects: ProjectListItem[];
  marketplaceProjects: ProjectListItem[];
}

const defaultState: IProjectContext = {
  isLoading: true,
  availableProjects: [],
  marketplaceProjects: []
};

export const ProjectContext =
  React.createContext<IProjectContext>(defaultState);

export const ProjectContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    account: { address }
  } = useGetAccountInfo();
  const [isLoading, setIsLoading] = React.useState(true);

  const availableProjects = useGetAvailableProjects();
  const marketplaceProjects = useGetMarketplaceProjects();

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        availableProjects,
        marketplaceProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

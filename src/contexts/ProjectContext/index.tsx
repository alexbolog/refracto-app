import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import useGetAvailableProjects from './hooks/useGetAvailableProjects';

export interface IProjectContext {
  isLoading: boolean;
  availableProjects: ProjectListItem[];
}

const defaultState: IProjectContext = {
  isLoading: true,
  availableProjects: []
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

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        availableProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import useGetAccountOverview from '../AccountContext/hooks/useGetAccountOverview';
import React from 'react';
import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from '../AccountContext/hooks/useGetAccountActiveInvestments';
import useGetAvailableProjects from './hooks/useGetAvailableProjects';

export interface IProjectContext {
  isLoading: boolean;
}

const defaultState: IProjectContext = {
  isLoading: true
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
        isLoading
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

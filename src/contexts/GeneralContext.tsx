import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React from 'react';
import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from './hooks/useGetAccountActiveInvestments';

export interface IGeneralContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  activeProjectInvestments?: ActiveProjectInvestment[];
  address?: string;
}

const defaultState: IGeneralContext = {
  isLoading: true
};

export const GeneralContext =
  React.createContext<IGeneralContext>(defaultState);

export const GeneralContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    account: { address }
  } = useGetAccountInfo();
  const [isLoading, setIsLoading] = React.useState(true);

  const accountOverview = useGetAccountOverview();
  const activeProjectInvestments = useGetAccountActiveInvestments();

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        accountOverview,
        activeProjectInvestments,
        address
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

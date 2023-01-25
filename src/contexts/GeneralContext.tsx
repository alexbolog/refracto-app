import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { getAccountOverview } from 'apiRequests/backend/accountApi';
import useGetAccountOverview from 'hooks/useGetAccountOverview';
import React from 'react';
import { AccountOverview } from 'types/accountTypes';

export interface IGeneralContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
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

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        accountOverview,
        address
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

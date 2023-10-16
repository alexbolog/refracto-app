import { ResultsParser } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React, { useEffect, useState } from 'react';
import { useGetProxyProvider } from 'sc/helpers/hooks/useGetProxyProvider';
import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';

export const useGetIsKycCompliant = () => {
  const { address } = useGetAccountInfo();
  const smartContract = useGetSmartContract();
  const proxy = useGetProxyProvider();

  const [isKycCompliant, setIsKycCompliant] = useState(false);

  const getIsKycCompliant = async () => {
    if (!address || !address.startsWith('erd1')) {
      return false;
    }
    const interaction = smartContract.methods.isKycCompliant([address]).check();
    const query = await interaction.buildQuery();
    const queryResponse = await proxy.queryContract(query);
    const { firstValue, returnCode, returnMessage } =
      new ResultsParser().parseQueryResponse(
        queryResponse,
        interaction.getEndpoint()
      );

    if (!returnCode.isSuccess()) {
      console.error('Failed to get isKycCompliant');
      return false;
    }
    return firstValue?.valueOf();
  };

  useEffect(() => {
    getIsKycCompliant().then((result) => {
      setIsKycCompliant(result);
    });
  }, [address]);

  return isKycCompliant;
};

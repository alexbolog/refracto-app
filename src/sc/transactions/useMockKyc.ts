import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';
import { useSendTransactionWrapper } from 'sc/helpers/hooks/useSendTransactionWrapper';

export const useMockKyc = () => {
  const contract = useGetSmartContract();
  const { address } = useGetAccountInfo();
  const sendTx = useSendTransactionWrapper();

  const sendMockKycTx = async () => {
    const interaction = contract.methods
      .registerSuccessfulKyc([address])
      .withGasLimit(20_000_000);
    await sendTx(interaction);
  };

  return sendMockKycTx;
};

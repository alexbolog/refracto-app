import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import { useGetFaucetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';
import { useSendTransactionWrapper } from 'sc/helpers/hooks/useSendTransactionWrapper';

export const useMintDemoUSDC = () => {
  const contract = useGetFaucetSmartContract();
  const { address } = useGetAccountInfo();
  const sendTx = useSendTransactionWrapper();

  const mint = async () => {
    const interaction = contract.methods.mint([]).withGasLimit(20_000_000);
    await sendTx(interaction);
  };

  return mint;
};

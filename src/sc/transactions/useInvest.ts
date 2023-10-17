import { TokenPayment } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { USDC_TOKEN_ID } from 'config';
import React from 'react';
import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';
import { useSendTransactionWrapper } from 'sc/helpers/hooks/useSendTransactionWrapper';

export const useInvest = () => {
  const contract = useGetSmartContract();
  const { address } = useGetAccountInfo();
  const sendTx = useSendTransactionWrapper();

  const invest = async (projectId: number, amount: number) => {
    const interaction = contract.methods
      .invest([projectId])
      .withSingleESDTTransfer(
        TokenPayment.fungibleFromAmount(USDC_TOKEN_ID, amount, 6)
      )
      .withGasLimit(25_000_000);
    await sendTx(interaction);
  };

  return invest;
};

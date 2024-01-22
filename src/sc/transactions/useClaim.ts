import { Address, TokenPayment } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { REFRACTO_LOAN_SHARE_TOKEN_ID, USDC_TOKEN_ID } from 'config';
import React from 'react';
import { useGetSmartContract } from 'sc/helpers/hooks/useGetSmartContract';
import { useSendTransactionWrapper } from 'sc/helpers/hooks/useSendTransactionWrapper';

export const useClaim = () => {
  const contract = useGetSmartContract();
  const sendTx = useSendTransactionWrapper();
  const { address } = useGetAccountInfo();
  const invest = async (tokenNonce: number, amount: number) => {
    const interaction = contract.methods
      .claim([])
      .withSingleESDTNFTTransfer(
        TokenPayment.metaEsdtFromAmount(
          REFRACTO_LOAN_SHARE_TOKEN_ID,
          tokenNonce,
          amount,
          18
        ),
        new Address(address)
      )
      .withGasLimit(45_000_000);
    await sendTx(interaction);
  };

  return invest;
};

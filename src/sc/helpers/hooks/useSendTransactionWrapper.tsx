import { Interaction } from '@multiversx/sdk-core/out';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import { sendTransactions } from '@multiversx/sdk-dapp/services';

export const useSendTransactionWrapper = () => {
  const { chainID } = useGetNetworkConfig();
  const { account } = useGetAccountInfo();

  const sendTransactionWrapper = async (interaction: Interaction) => {
    const tx = interaction.withChainID(chainID).buildTransaction();
    await sendTransactions({
      transactions: [
        {
          value: tx.getValue(),
          data: tx.getData(),
          gasLimit: tx.getGasLimit(),
          receiver: tx.getReceiver()
        }
      ]
    });
  };

  return sendTransactionWrapper;
};

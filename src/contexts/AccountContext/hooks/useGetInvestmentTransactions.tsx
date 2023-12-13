import React, { useEffect, useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';
import { InvestmentTransaction } from 'types/accountTypes';
import { getInvestmentTransactions } from 'apiRequests/backend/accountApi';
import { readTransactionsByFunction } from 'db/transactions';
import { useSupabaseRealtime } from 'hooks/supabase/useSupabaseRealtime';
import { useGetAccount } from '@multiversx/sdk-dapp/hooks';

const useGetInvestmentTransactions = () => {
  const { address } = useGetAccount();
  const [transactions, setTransactions] = useState<InvestmentTransaction[]>([]);

  useSupabaseRealtime({
    channel: 'processed_transactions',
    isAuthRequired: true,
    onAll: () => {
      updateTransactions();
    }
  });

  const updateTransactions = () => {
    readTransactionsByFunction('invest').then((txs) => {
      setTransactions(txs);
    });
  };

  useEffect(() => {
    updateTransactions();
  }, [address]);

  return transactions;
};

export default useGetInvestmentTransactions;

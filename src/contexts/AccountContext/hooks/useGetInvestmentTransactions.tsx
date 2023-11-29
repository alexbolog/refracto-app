import React, { useEffect, useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';
import { InvestmentTransaction } from 'types/accountTypes';
import { getInvestmentTransactions } from 'apiRequests/backend/accountApi';
import { readTransactionsByFunction } from 'db/transactions';

const useGetInvestmentTransactions = () => {
  // const [investmentTransactions, setInvestmentTransactions] = useState<
  //   InvestmentTransaction[]
  // >([]);

  // useEffect(() => {
  //   readTransactionsByFunction('invest').then((data) =>
  //     setInvestmentTransactions(data)
  //   );
  // }, []);

  return () => readTransactionsByFunction('invest');
};

export default useGetInvestmentTransactions;

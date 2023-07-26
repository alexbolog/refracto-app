import React, { useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';
import { InvestmentTransaction } from 'types/accountTypes';
import { getInvestmentTransactions } from 'apiRequests/backend/accountApi';

const useGetInvestmentTransactions = () => {
  const [investmentTransactions, setInvestmentTransactions] = useState<
    InvestmentTransaction[]
  >(getInvestmentTransactions());

  return investmentTransactions;
};

export default useGetInvestmentTransactions;

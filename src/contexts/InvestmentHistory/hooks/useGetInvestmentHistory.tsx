import React from 'react';
import { InvestmentEvent } from '../../../types/investmentEvent';
import { getInvestmentHistory } from '../../../apiRequests/backend/investmentHistoryApi';

const useGetInvestmentHistory = (): InvestmentEvent[] => {
  const [investmentHistory, setInvestmentHistory] = React.useState<
    InvestmentEvent[]
  >(getInvestmentHistory());

  return investmentHistory;
};

export default useGetInvestmentHistory;

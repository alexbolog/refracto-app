import { supabase } from 'apiRequests/supabaseClient';
import {
  InvestmentTransaction,
  InvestmentTransactionStatus
} from 'types/accountTypes';

export const readTransactionsByFunction = async (
  functionName: 'invest'
): Promise<InvestmentTransaction[]> => {
  const { data, error } = await supabase.rpc('get_user_transactions', {
    function_filter: functionName
  });

  if (error || data === null) {
    console.log('Error fetching user transactions', error);
    return [];
  }

  return data.map((d: any) => ({
    date: d.created_at,
    status:
      d.status === 'success'
        ? InvestmentTransactionStatus.Finished
        : d.status === 'fail'
        ? InvestmentTransactionStatus.Cancelled
        : InvestmentTransactionStatus.Pending,
    projectTitle: d.project_title,
    currency: 'USD', // TODO
    amount: d.amount,
    type: 'DEPOSIT', // TODO
    operation: 'CREDIT', // TODO
    description: 'N/A', // TODO
    transactionHash: d.tx_hash
  }));
};

import dashboardGraph from '../../dbNew/investmentHistory.json';
import { INVESTMENT_EVENT_TYPE } from '../../enums';
import { InvestmentEvent } from '../../types/investmentEvent';

export const getInvestmentHistory = (): InvestmentEvent[] => {
  console.log('getInvestmentHistory', dashboardGraph);
  return dashboardGraph.map((l: any) => {
    if (l.eventType) {
      l.eventType = l.eventType as INVESTMENT_EVENT_TYPE;
    }
    return l;
  });
};

import dashboardGraph from '../../dbNew/investmentHistory.json';
import { INVESTMENT_EVENT_TYPE } from '../../enums';
import { InvestmentEvent } from '../../types/investmentEvent';

export const getInvestmentHistory = (): InvestmentEvent[] => {
  console.log('getInvestmentHistory', dashboardGraph);
  return dashboardGraph.map((l: any) => {
    if (l.eventType) {
      l.eventType = mapStringToInvestmentEventType(l.eventType);
    }
    return l;
  });
};

const mapStringToInvestmentEventType = (
  eventTypeString: string
): INVESTMENT_EVENT_TYPE => {
  switch (eventTypeString) {
    case 'DEPOSIT':
      return INVESTMENT_EVENT_TYPE.DEPOSIT;
    case 'INVEST':
      return INVESTMENT_EVENT_TYPE.INVEST;
    case 'PAYOUT':
      return INVESTMENT_EVENT_TYPE.PAYOUT;
    case 'WITHDRAW':
      return INVESTMENT_EVENT_TYPE.WITHDRAW;
    default:
      throw new Error('Invalid investment event type');
  }
};

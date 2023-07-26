import dashboardGraph from '../../dbNew/investmentHistory.json';
import { InvestmentEventType } from '../../enums';
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
): InvestmentEventType => {
  switch (eventTypeString) {
    case 'DEPOSIT':
      return InvestmentEventType.DEPOSIT;
    case 'INVEST':
      return InvestmentEventType.INVEST;
    case 'PAYOUT':
      return InvestmentEventType.PAYOUT;
    case 'WITHDRAW':
      return InvestmentEventType.WITHDRAW;
    default:
      throw new Error('Invalid investment event type');
  }
};

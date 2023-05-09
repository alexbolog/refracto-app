import { INVESTMENT_EVENT_TYPE } from '../enums';

export interface InvestmentEvent {
  date: string; // ISO format
  availableBalance: number;
  committedBalance: number;
  total: number;
  eventType: INVESTMENT_EVENT_TYPE;
  availableDifference: number;
  committedDifference: number;
}

import { InvestmentEventType } from '../enums';

export interface InvestmentEvent {
  date: string; // ISO format
  availableBalance: number;
  committedBalance: number;
  total: number;
  // TODO: merge below into event field?
  eventType?: InvestmentEventType;
  availableDifference?: number;
  committedDifference?: number;
}

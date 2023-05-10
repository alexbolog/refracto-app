import { InvestmentEvent } from './investmentEvent';

export default interface ProjectInvestmentEvent {
  projectId: string;
  investments: InvestmentEvent[];
}

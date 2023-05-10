import { InvestmentEvent } from './investmentEvent';

export default interface ProjectInvestmentEvent {
  projectId: string;
  projectTitle: string;
  investments: InvestmentEvent[];
}

import { InvestmentEvent } from './investmentEvent';

export default interface ProjectInvestmentEvent {
  projectId: string;
  projectTitle: string;
  returnPercentage: number;
  investments: InvestmentEvent[];
}

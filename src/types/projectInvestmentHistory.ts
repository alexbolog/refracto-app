import { InvestmentEvent } from './investmentEvent';

export default interface ProjectInvestmentHistory {
  projectId: string;
  projectTitle: string;
  returnPercentage: number;
  investments: InvestmentEvent[];
}

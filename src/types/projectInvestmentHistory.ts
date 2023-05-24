import { InvestmentEvent } from './investmentEvent';
import { ProjectStatus } from '../enums';

export default interface ProjectInvestmentHistory {
  projectId: string;
  projectTitle: string;
  returnPercentage: number;
  status: ProjectStatus;
  investments: InvestmentEvent[];
}

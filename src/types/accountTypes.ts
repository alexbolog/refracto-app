import { PaymentStatuses } from 'components/PaymentStatusContainer/PaymentStatusEntry';

export interface AccountOverview {
  availableBalance: number;
  accountValue: number;
  committedfunds: number;
  activeInvestments: ActiveInvestmentsStatistics;
  favoriteProjects: FavoriteProject[];
  suggestedProjects: SuggestedProject[];
  payments: Payment[];
}

export interface ActiveInvestmentsStatistics {
  totalInvested: number;
  returnedToDate: number;
  lifetimeReturn: number;
  expectedTotalReturn: number;
  expectedTotalProfit: number;
  averageExpectedReturn: number;
}

export interface FavoriteProject {
  projectId: string;
  return: number;
  crowdfundingDeadline: Date;
  thumbnailSrc: string;
}

export interface SuggestedProject extends FavoriteProject {
  isFavorite: boolean;
}

export interface Payment {
  Date: Date;
  ProjectTitle: string;
  PaymentStatus: PaymentStatuses;
  PaymentAmount: number;
  TxHash?: string;
}

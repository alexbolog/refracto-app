import { PaymentStatuses } from 'enums';
import { ProjectListItem } from './projectTypes';

export interface AccountOverview {
  availableBalance: number;
  accountValue: number;
  committedfunds: number;
  activeInvestments?: ActiveInvestmentsStatistics;
  favoriteProjects: FavoriteProject[];
  suggestedProjects: SuggestedProject[];
  payments: Payment[];
  investments: Investment[];
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
  projectId: number;
  returnPercentage: number;
  crowdfundingDeadline: string; // ISO format
  thumbnailSrc: string;
  projectTitle: string;
}

export interface SuggestedProject extends FavoriteProject {
  isFavorite: boolean;
}

export interface Payment {
  projectId: string;
  date: string; // ISO format
  projectTitle: string;
  paymentStatus: PaymentStatuses;
  paymentAmount: number;
  xHash?: string;
}

export interface InvestmentTransaction {
  date: string; // ISO format
  status: InvestmentTransactionStatus;
  projectTitle: string;
  currency: 'EUR' | 'USD';
  amount: number;
  type: 'DEPOSIT';
  operation: string;
  description: string;
  transactionHash: string;
}

export enum InvestmentTransactionStatus {
  Pending,
  Finished,
  Cancelled
}

export interface Investment {
  nonce: number;
  balance: number;
  projectInfo: ProjectListItem; // TODO: add type
}

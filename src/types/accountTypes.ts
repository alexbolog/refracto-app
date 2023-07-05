import { PaymentStatuses } from 'enums';

export interface AccountOverview {
  availableBalance: number;
  accountValue: number;
  committedfunds: number;
  activeInvestments?: ActiveInvestmentsStatistics;
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

export interface DocumentAgreement {
  date: string; // ISO format
  agreementId: string;
  projectName: string;
  status: DocumentAgreementStatus;
  documentType: DocumentAgreementType;
  filePath: string;
}

export enum DocumentAgreementStatus {
  Signed,
  Unsigned,
  Cancelled
}

export enum DocumentAgreementType {
  Investment = 'Investment',
  SecondaryMarket = 'Secondary Market'
}

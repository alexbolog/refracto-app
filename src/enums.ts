export enum RiskRatingLevel {}

export enum AssetClass {}
export enum InvestmentType {}

// TODO: change enums types and members to Camelcase
//  https://www.typescriptlang.org/docs/handbook/enums.html
export enum PaymentStatuses {
  CLAIMED = 0,
  EXPECTED = 1,
  PENDING = 2
}

export enum AVAILABLE_CURRENCIES {
  EUR = 1,
  USD = 2
}

export enum InvestmentEventType {
  PAYOUT = 'PAYOUT',
  INVEST = 'INVEST',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW'
}

export enum ProjectStatus {
  Planned = 0,
  Crowdfunding = 1,
  Cancelled = 2,
  Active = 3,
  Delayed = 4,
  Finished = 5
}

export function isProjectStatusActive(status: ProjectStatus): boolean {
  return status === ProjectStatus.Active || status === ProjectStatus.Delayed;
}

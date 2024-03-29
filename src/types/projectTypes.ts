export interface ProjectListItem {
  projectId: number;
  projectTitle: string;
  returnPercentage: number;
  riskRatingLevel: string;
  crowdfundingDeadline: string; // ISO format
  crowdfundingTarget: number;
  crowdfundedAmount: number;
  colorCodeHex: string;
  thumbnailSrc: string;
  tokenNonce: number;
}

export interface ActiveProjectInvestment extends ProjectListItem {
  amountInvested: number;
}

export interface ProjectPageDetails extends ProjectListItem {
  loanDeadline: string;
  images: string[];
  assetClass: string;
  investmentType: string;
  totalParticipantsCount: number;
  projectDeveloperId: string;
  projectDeveloperName: string;
  amountReturnedSoFar: number;
  shortDescription: string;
  executiveSummary: string;
}

export interface FullProjectPageDetails extends ProjectPageDetails {
  projectDetails: string;
  location: Coordinates;
  sponsorInfo: string;
  swotAnalysis: SWOTAnalysis;
  refractoRating: RefractoRatingItem[];
  capitalStructure: CapitalStructureItem[];
  repaymentSchedule: RepaymentScheduleEntry[];
  financingDetails: string;
  attachmentUrls: string[];
  questionsAndAnswers: QuestionAndAnswer[];
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RefractoRatingItem {
  category: string;
  assessments: string;
}

export interface CapitalStructureItem {
  type: string;
  source: string;
  amount: number;
}

export interface RepaymentScheduleEntry {
  date: string; // ISO format
  paymentStatus: string;
  lateFees: number;
  principalAmount: number;
  interestAmount: number;
  paid: number;
}

export interface QuestionAndAnswer {
  id: string;
  parentId?: string;
  ownerAddress?: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  ownerImgSrc?: string;
  text: string;
  insertDate: string; // ISO format
  isPendingModeration?: boolean;
}

export interface MarketplaceListing {
  projectId: string;
  projectTitle: string;
  thumbnailSrc: string;
  listingsExpireTimestamp: string;
  remainingPrincipal: number;
  price: number;
  repayment: number;
  expectedRor: number;
  daysLeft: number;
}

export interface ProjectListItem {
  projectId: string;
  projectTitle: string;
  returnPercentage: number;
  riskRatingLevel: string;
  crowdfundingDeadline: string; // ISO format
  crowdfundingTarget: number;
  crowdfundedAmount: number;
  colorCodeHex: string;
  thumbnailSrc: string;
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
  assesments: string;
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
}

export interface QuestionAndAnswer {
  ownerAddress: string;
  question: string;
  answer: string;
  questionDate: string; // ISO format
  answerDate: string; // ISO format
}

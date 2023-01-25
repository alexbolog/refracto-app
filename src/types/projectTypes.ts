export interface ProjectListItem {
  projectId: string;
  projectTitle: string;
  returnPercentage: number;
  riskRatingLevel: string;
  crowdfundingDeadline: Date;
  crowdfundingTarget: number;
  crowdfundedAmount: number;
}

export interface ProjectPageDetails extends ProjectListItem {
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
  crowdEstateRating: CrowdestateRatingItem[];
  capitalStructure: CapitalStructureItem[];
  repaymentSchedule: RepaymentScheduleEntry[];
  financingDetails: string;
  attachmentUrls: string[];
  questionsAndAnswers: QuestionAndAnswer[];
}

export interface Coordinates {
  X: number;
  Y: number;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface CrowdestateRatingItem {
  category: string;
  assesments: string;
}

export interface CapitalStructureItem {
  type: string;
  source: string;
  amount: number;
}

export interface RepaymentScheduleEntry {
  date: Date;
  paymentStatus: string;
  lateFees: number;
  principalAmount: number;
  interestAmount: number;
}

export interface QuestionAndAnswer {
  ownerAddress: string;
  question: string;
  answer: string;
  questionDate: Date;
  answerDate: Date;
}

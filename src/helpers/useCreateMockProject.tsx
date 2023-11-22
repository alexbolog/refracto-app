import { insertProject } from 'db/projects';
import mockData from './mockDataSource.json';
import {
  CreateProjectPayload,
  useCreateProject
} from 'sc/transactions/useCreateProject';
import {
  INTEREST_RATE_DENOMINATION,
  ONE_DENOMINATED_USDC,
  USDC_TOKEN_ID,
  contractAddress
} from 'config';
import BigNumber from 'bignumber.js';

export const useCreateMockProject = () => {
  const createScProject = useCreateProject();

  const createMockProject = async () => {
    const projectInfo = await randomizeInsertProject();
    await createScProject(projectInfo);
  };

  function getRandomItem<T>(items: T[]): T {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  function getRandomDate(start: Date, end: Date): Date {
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime);
  }

  function getRandomNumberInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  function getRandomHexColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRefractoRating(ratingsData: any) {
    return ratingsData.map((rd: any) => ({
      category: rd.category,
      assessments: getRandomItem(rd.assessments)
    }));
  }

  async function randomizeInsertProject(): Promise<CreateProjectPayload> {
    const titles = mockData.titles;
    const crowdfundingTargets = Array.from(
      { length: 10 },
      (_, i) => (i + 2) * 10000
    );
    const attachmentUrls = mockData.attachmentUrls;
    const returnPercentages = Array.from({ length: 10 }, () =>
      getRandomNumberInRange(0.05, 0.2)
    );
    const thumbnailUrls = mockData.thumbnailUrls;
    const projectDeveloperIds = [1];
    const riskRatingLevels = mockData.riskRatingLevels;
    const assetClasses = mockData.assetClasses;
    const investmentTypes = mockData.investmentTypes;
    const shortDescriptions = mockData.shortDescriptions;
    const executiveSummaries = mockData.executiveSummaries;
    const details = mockData.details;
    const locations = mockData.locations;
    const sponsorInfos = mockData.sponsorInfos;
    const refractoRatings = mockData.refractoRatings;
    const capitalStructures = mockData.capitalStructures;
    const financingDetails = mockData.financingDetails;
    const analysis = mockData.analysis;

    const now = new Date();
    const crowdfundingDeadline = getRandomDate(
      now,
      new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    const projectDeadline = new Date(
      crowdfundingDeadline.getTime() +
        getRandomNumberInRange(6, 12) * 30 * 24 * 60 * 60 * 1000
    );

    const randomTitle = getRandomItem(titles);
    const randomReturnPercentage = getRandomItem(returnPercentages);
    const randomCrowdfundingTarget = getRandomItem(crowdfundingTargets);
    const randomColor = getRandomHexColor();
    const randomThumbnailUrl = getRandomItem(thumbnailUrls);
    const randomProjectDeveloperId = getRandomItem(projectDeveloperIds);
    const randomRiskRatingLevel = getRandomItem(riskRatingLevels) as
      | 'Low'
      | 'Medium'
      | 'High';
    const randomAssetClass = getRandomItem(assetClasses) as
      | 'Residential'
      | 'Industrial'
      | 'Commercial';
    const randomInvestmentType = getRandomItem(investmentTypes) as
      | 'Development'
      | 'Refurbish';
    const randomShortDescription = getRandomItem(shortDescriptions);
    const randomExecutiveSummary = getRandomItem(executiveSummaries);
    const randomDetails = getRandomItem(details);
    const randomLocation = getRandomItem(locations);
    const randomSponsorInfo = getRandomItem(sponsorInfos);
    const randomRefractoRatings = getRefractoRating(refractoRatings);
    const randomCapitalStructures = Array.from({ length: 3 }, () =>
      getRandomItem(capitalStructures)
    );
    const randomFinancingDetails = getRandomItem(financingDetails);
    const randomAttachmentUrl = getRandomItem(attachmentUrls);

    const projectId = await insertProject(
      randomTitle,
      randomReturnPercentage,
      crowdfundingDeadline.toISOString().split('T')[0],
      randomCrowdfundingTarget,
      0,
      randomColor,
      randomThumbnailUrl,
      projectDeadline.toISOString().split('T')[0],
      [randomThumbnailUrl],
      randomProjectDeveloperId,
      randomRiskRatingLevel,
      randomAssetClass,
      randomInvestmentType,
      randomShortDescription,
      randomExecutiveSummary,
      randomDetails,
      randomLocation,
      randomSponsorInfo,
      randomRefractoRatings,
      randomCapitalStructures,
      randomFinancingDetails,
      [randomAttachmentUrl],
      analysis
    );

    return {
      projectId,
      projectName: randomTitle,
      projectPaymentToken: USDC_TOKEN_ID,
      dailyInterestRate: new BigNumber(randomReturnPercentage)
        .dividedBy(365)
        .multipliedBy(INTEREST_RATE_DENOMINATION)
        .integerValue()
        .toNumber(),
      dailyPenaltyFeeRate: new BigNumber(randomReturnPercentage)
        .dividedBy(365)
        .multipliedBy(INTEREST_RATE_DENOMINATION)
        .integerValue()
        .toNumber(),
      developerWallet:
        'erd1tztluf08g90max7jkr4jtac9w5qv7qacgkhh57q9nz2erq9y2p3sd5njkg',
      sharePricePerUnit: ONE_DENOMINATED_USDC,
      cfStartTimestamp: 0,
      cfEndTimestamp: new BigNumber(crowdfundingDeadline.getTime())
        .dividedBy(1000)
        .integerValue()
        .toNumber(),
      cfTargetMin: new BigNumber(randomCrowdfundingTarget)
        .multipliedBy(ONE_DENOMINATED_USDC)
        .toNumber(),
      cfTargetMax: new BigNumber(randomCrowdfundingTarget)
        .multipliedBy(ONE_DENOMINATED_USDC)
        .multipliedBy(1.1)
        .toNumber(),
      loanDuration: new BigNumber(projectDeadline.getTime())
        .dividedBy(1000)
        .integerValue()
        .toNumber()
    };
  }

  return createMockProject;
};

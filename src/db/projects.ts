import { supabase } from 'apiRequests/supabaseClient';
import { ProjectListItem } from 'types/projectTypes';
import { Database } from 'types/supabase';

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

export async function randomizeInsertProject() {
  const titles = ['Project A', 'Project B', 'Project C'];
  const crowdfundingTargets = Array.from(
    { length: 10 },
    (_, i) => (i + 2) * 10000
  );
  const returnPercentages = Array.from({ length: 10 }, () =>
    getRandomNumberInRange(0.05, 0.2)
  );
  const colors = ['#000000', '#ffffff', '#ff0000'];
  const thumbnailUrls = [
    'https://www.example.com/image1.jpg',
    'https://www.example.com/image2.jpg',
    'https://www.example.com/image3.jpg'
  ];
  const projectDeveloperIds = [1];
  const riskRatingLevels = ['Low', 'Medium', 'High'];
  const assetClasses = ['Residential', 'Industrial', 'Commercial'];
  const investmentTypes = ['Development', 'Refurbish'];
  const shortDescriptions = [
    'Short description 1',
    'Short description 2',
    'Short description 3'
  ];
  const executiveSummaries = [
    'Executive summary 1',
    'Executive summary 2',
    'Executive summary 3'
  ];
  const details = ['Details 1', 'Details 2', 'Details 3'];
  const locations = ['(0,0)', '(1,1)', '(2,2)'];
  const sponsorInfos = ['Sponsor info 1', 'Sponsor info 2', 'Sponsor info 3'];
  const refractoRatings = [
    { category: 'Category 1', assessments: 'Assessments 1' },
    { category: 'Category 2', assessments: 'Assessments 2' },
    { category: 'Category 3', assessments: 'Assessments 3' }
  ];
  const capitalStructures = [
    { type: 'Type 1', source: 'Source 1', amount: 100000 },
    { type: 'Type 1', source: 'Source 1', amount: 100000 },
    { type: 'Type 2', source: 'Source 2', amount: 200000 },
    { type: 'Type 3', source: 'Source 3', amount: 300000 }
  ];
  const financingDetails = [
    'Financing details 1',
    'Financing details 2',
    'Financing details 3'
  ];
  const attachmentUrls = [
    'https://www.example.com/attachment1.pdf',
    'https://www.example.com/attachment2.pdf',
    'https://www.example.com/attachment3.pdf'
  ];
  const analysis = {
    strengths: ['Strengths 1', 'Strengths 2', 'Strengths 3'],
    weaknesses: ['Weaknesses 1', 'Weaknesses 2', 'Weaknesses 3'],
    opportunities: ['Opportunities 1', 'Opportunities 2', 'Opportunities 3'],
    threats: ['Threats 1', 'Threats 2', 'Threats 3']
  };

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
  const randomColor = getRandomItem(colors);
  const randomThumbnailUrl = getRandomItem(thumbnailUrls);
  const randomProjectDeveloperId = getRandomItem(projectDeveloperIds);
  const randomRiskRatingLevel: 'Low' | 'Medium' | 'High' = getRandomItem(
    riskRatingLevels
  ) as 'Low' | 'Medium' | 'High';
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
  const randomRefractoRatings = Array.from({ length: 3 }, () =>
    getRandomItem(refractoRatings)
  );
  const randomCapitalStructures = Array.from({ length: 3 }, () =>
    getRandomItem(capitalStructures)
  );
  const randomFinancingDetails = getRandomItem(financingDetails);
  const randomAttachmentUrl = getRandomItem(attachmentUrls);

  await insertProject(
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
}

// export async function testInsertProject() {
//   await insertProject(
//     'Test Project',
//     0.1,
//     '2021-10-10',
//     100000,
//     0,
//     '#000000',
//     'https://www.google.com',
//     '2021-10-10',
//     ['https://www.google.com'],
//     1,
//     'Low',
//     'Residential',
//     'Development',
//     'Short description',
//     'Executive summary',
//     'Details',
//     '(0,0)',
//     'Sponsor info',
//     [],
//     [],
//     'Financing details',
//     ['https://www.google.com'],
//     {
//       strengths: ['Strengths'],
//       weaknesses: ['Weaknesses'],
//       opportunities: ['Opportunities'],
//       threats: ['Threats']
//     }
//   );
// }

async function insertProject(
  title: string,
  returnPercentage: number,
  crowdfundingDeadline: string,
  crowdfundingTarget: number,
  crowdfundedAmount: number,
  colorCodeHex: string,
  thumbnailSrc: string,
  loanDeadline: string,
  images: string[],
  projectDeveloperId: number,
  riskRatingLevel: 'Low' | 'Medium' | 'High',
  assetClass: 'Residential' | 'Industrial' | 'Commercial',
  investmentType: 'Development' | 'Refurbish',
  shortDescription: string,
  executiveSummary: string,
  details: string,
  location: any,
  sponsorInfo: string,
  refractoRating: RefractoRating[],
  capitalStructure: CapitalStructure[],
  financingDetails: string,
  attachmentUrls: string[],
  analysis: SWOTAnalysis
): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('insert_project', {
      p_title: title,
      p_return_percentage: returnPercentage,
      p_crowdfunding_deadline: crowdfundingDeadline,
      p_crowdfunding_target: crowdfundingTarget,
      p_crowdfunded_amount: crowdfundedAmount,
      p_color_code_hex: colorCodeHex,
      p_thumbnail_src: thumbnailSrc,
      p_loan_deadline: loanDeadline,
      p_images: images,
      p_project_developer_id: projectDeveloperId,
      p_risk_rating_level: riskRatingLevel,
      p_asset_class: assetClass,
      p_investment_type: investmentType,
      p_short_description: shortDescription,
      p_executive_summary: executiveSummary,
      p_details: details,
      p_location: location,
      p_sponsor_info: sponsorInfo,
      p_refracto_rating: refractoRating,
      p_capital_structure: capitalStructure,
      p_financing_details: financingDetails,
      p_attachment_urls: attachmentUrls,
      p_analysis: analysis
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('Successfully inserted project: ', data);
    const projectId = 0; //data[0].insert_project;

    return projectId;
  } catch (error) {
    console.error('Error inserting project:', error);
    throw error;
  }
}

interface RefractoRating {
  category: string;
  assessments: string;
}

interface CapitalStructure {
  type: string;
  source: string;
  amount: number;
}

interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

// CRUD operations for Projects

// Create a new project
export const createProject = async (
  project: Database['public']['Tables']['Projects']['Insert']
) => {
  const { data, error } = await supabase.from('Projects').insert([project]);
  if (error) console.log('Error: ', error);
  else return data;
};

// Read projects
export const readProjects = async () => {
  const { data, error } = await supabase.from('Projects').select('*');
  if (error) console.log('Error: ', error);
  else return data;
};

// Update a project
export const updateProject = async (
  id: number,
  newProject: Partial<Database['public']['Tables']['Projects']['Update']>
) => {
  const { data, error } = await supabase
    .from('Projects')
    .update(newProject)
    .eq('id', id);
  if (error) console.log('Error: ', error);
  else return data;
};

// Delete a project
export const deleteProject = async (id: number) => {
  const { data, error } = await supabase.from('Projects').delete().eq('id', id);
  if (error) console.log('Error: ', error);
  else return data;
};

// Read projects with specific data
export const readProjectData = async () => {
  const { data, error } = await supabase.from('Projects').select('id,title');
  if (error) console.log('Error: ', error);
  else return data;
};

// Call stored procedure "read_project_data"
export const getProjectList = async (): Promise<ProjectListItem[]> => {
  const { data, error } = await supabase.rpc('read_project_data');
  if (error) {
    console.log('Error: ', error);
    return []; // return an empty array in case of an error
  } else return parseProjectListResponse(data ?? []);
};

const parseProjectListResponse = (
  response: {
    id: number;
    title: string;
    returnpercentage: number;
    riskratinglevel: Database['public']['Enums']['riskratinglevel'];
    crowdfundingdeadline: string;
    crowdfundingtarget: number;
    crowdfundedamount: number;
    colorcodehex: string;
    thumbnailsrc: string;
  }[]
): ProjectListItem[] => {
  return response.map((r) => ({
    projectId: r.id,
    projectTitle: r.title,
    returnPercentage: r.returnpercentage,
    riskRatingLevel: r.riskratinglevel,
    crowdfundingDeadline: r.crowdfundingdeadline,
    crowdfundingTarget: r.crowdfundingtarget,
    crowdfundedAmount: r.crowdfundedamount,
    colorCodeHex: r.colorcodehex,
    thumbnailSrc: r.thumbnailsrc
  }));
};
// export interface ProjectListItem {
//   projectId: string;
//   projectTitle: string;
//   returnPercentage: number;
//   riskRatingLevel: string;
//   crowdfundingDeadline: string; // ISO format
//   crowdfundingTarget: number;
//   crowdfundedAmount: number;
//   colorCodeHex: string;
//   thumbnailSrc: string;
// }

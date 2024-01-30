import { supabase } from 'apiRequests/supabaseClient';
import { ProjectFundingStatus, ProjectListItem } from 'types/projectTypes';
import { Database } from 'types/supabase';

export async function insertProject(
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
    return data ?? -1;
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
    sharetokennonce: number;
    status?: number;
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
    thumbnailSrc: r.thumbnailsrc,
    tokenNonce: r.sharetokennonce,
    status: (r.status ?? 0) as ProjectFundingStatus
  }));
};

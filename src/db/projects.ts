import { supabase } from 'apiRequests/supabaseClient';
import { ProjectListItem } from 'types/projectTypes';
import { Database } from 'types/supabase';

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
    projectId: r.id.toString(),
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

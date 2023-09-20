import { supabase } from 'apiRequests/supabaseClient';
import { FavoriteProject } from 'types/accountTypes';
// CRUD operations for FavoriteProjects

// Create a new favorite project
export const createFavoriteProject = async (
  walletAddress: string,
  projectId: number
) => {
  console.log(await supabase.auth.getUser());
  const { error } = await supabase.rpc('add_favorite_project', {
    wallet: walletAddress,
    proj_id: projectId
  });
  if (error) {
    console.error('Error saving favorite project to db: ', error);
  }
};

// Read favorite projects
export const readFavoriteProjects = async (
  walletAddress: string
): Promise<FavoriteProject[]> => {
  const { data, error } = await supabase.rpc('get_favorite_projects', {
    p_wallet_address: walletAddress
  });
  if (error || data === null) {
    console.error('Error fetching favorite projects from db: ', error);
    return [];
  }
  return data.map(parseFavoriteProject);
};

// Delete a favorite project
export const deleteFavoriteProject = async (
  walletAddress: string,
  id: number
) => {
  const { error } = await supabase.rpc('remove_favorite_project', {
    wallet: walletAddress,
    proj_id: id
  });
  if (error) {
    console.error('Error saving favorite project to db: ', error);
  }
};

const parseFavoriteProject = (project: any): FavoriteProject => {
  return {
    projectId: project.projectid,
    returnPercentage: project.returnpercentage,
    crowdfundingDeadline: project.crowdfundingdeadline,
    thumbnailSrc: project.thumbnailsrc,
    projectTitle: project.projecttitle
  };
};

import { supabase } from 'apiRequests/supabaseClient';
import { FavoriteProject } from 'types/accountTypes';
// CRUD operations for FavoriteProjects

// Create a new favorite project
export const createFavoriteProject = async (
  wallet_address: string,
  projectId: number
) => {
  const { error } = await supabase.rpc('add_favorite_project', {
    wallet: wallet_address,
    proj_id: projectId
  });

  if (error) {
    console.error(error);
  }
};

// Read favorite projects for a specific wallet address
export const readFavoriteProjects = async (
  wallet_address: string
): Promise<FavoriteProject[]> => {
  const { data, error } = await supabase.rpc('get_favorite_projects', {
    p_wallet_address: wallet_address
  });
  if (error) {
    console.log('Error: ', error);
    return [];
  } else {
    return (
      data?.map((d) => ({
        projectId: d.projectid,
        returnPercentage: d.returnpercentage,
        crowdfundingDeadline: d.crowdfundingdeadline,
        thumbnailSrc: d.thumbnailsrc,
        projectTitle: d.projecttitle
      })) ?? []
    );
  }
};

// Delete a favorite project
export const deleteFavoriteProject = async (
  wallet_address: string,
  id: number
) => {
  const { error } = await supabase.rpc('remove_favorite_project', {
    wallet: wallet_address,
    proj_id: id
  });
  if (error) {
    console.error(error);
  }
};

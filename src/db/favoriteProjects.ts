import { supabase } from 'apiRequests/supabaseClient';
// CRUD operations for FavoriteProjects

// Create a new favorite project
export const createFavoriteProject = async (
  projectId: number,
  wallet_address: string
) => {
  const { data, error } = await supabase
    .from('FavoriteProjects')
    .insert([{ projectId: projectId, wallet_address: wallet_address }]);
  if (error) console.log('Error: ', error);
  else return data;
};

// Read favorite projects for a specific wallet address
export const readFavoriteProjects = async (wallet_address: string) => {
  const { data, error } = await supabase
    .from('FavoriteProjects')
    .select('*')
    .eq('wallet_address', wallet_address);
  if (error) console.log('Error: ', error);
  else return data;
};

// Update a favorite project
export const updateFavoriteProject = async (
  id: number,
  newProjectId: number
) => {
  const { data, error } = await supabase
    .from('FavoriteProjects')
    .update({ projectId: newProjectId })
    .eq('id', id);
  if (error) console.log('Error: ', error);
  else return data;
};

// Delete a favorite project
export const deleteFavoriteProject = async (id: number) => {
  const { data, error } = await supabase
    .from('FavoriteProjects')
    .delete()
    .eq('id', id);
  if (error) console.log('Error: ', error);
  else return data;
};

import { supabase } from 'apiRequests/supabaseClient';
// CRUD operations for FavoriteProjects

// Create a new favorite project
export const createFavoriteProject = async (projectId: number) => {
  let { error } = await supabase.rpc('insert_favorite_project', {
    p_projectid: projectId
  });
  if (error) {
    console.error('Error saving favorite project to db: ', error);
  }
};

// Read favorite projects
export const readFavoriteProjects = async () => {
  let { data, error } = await supabase.rpc('get_favorite_projects');
  if (error) {
    console.error('Error fetching favorite projects from db: ', error);
    return [];
  }
  return data;
};

// Delete a favorite project
export const deleteFavoriteProject = async (id: number) => {
  const { error } = await supabase.rpc('delete_favorite_project', {
    p_projectid: id
  });
  if (error) {
    console.error('Error saving favorite project to db: ', error);
  }
};

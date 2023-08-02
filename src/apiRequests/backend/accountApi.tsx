import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import accountOverview from '../../dbNew/accountOverview.json';
import projectDetails from '../../dbNew/projectList.json';
import projectList from '../../dbNew/projectList.json';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from 'config';

export const getAccountOverview = (): AccountOverview => {
  const response = accountOverview as any as AccountOverview;
  for (let i = 0; i < response.favoriteProjects.length; i++) {
    response.favoriteProjects[i].projectTitle = projectDetails.filter(
      (pd) => pd.projectId === response.favoriteProjects[i].projectId
    )[0].projectTitle;
  }

  for (let i = 0; i < response.suggestedProjects.length; i++) {
    response.suggestedProjects[i].projectTitle = projectDetails.filter(
      (pd) => pd.projectId === response.suggestedProjects[i].projectId
    )[0].projectTitle;
  }
  return response;
};

export const getActiveProjectInvestments = (): ActiveProjectInvestment[] => {
  return projectList.map((l: any) => {
    const o = l as ActiveProjectInvestment;
    o.amountInvested = 123456.789;
    // o.thumbnailSrc = l.images[0];
    return o;
  });
};

export const getNewAuthToken = async () => {
  const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);
  const { data, error } = await supabase.rpc('generate_nonce_string');
  if (error) {
    console.error(error);
    return '';
  }
  return data;
};

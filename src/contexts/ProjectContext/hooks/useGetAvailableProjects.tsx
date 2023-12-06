import { getAvailableProjects } from 'apiRequests/backend';
import { useSupabaseRealtime } from 'hooks/supabase/useSupabaseRealtime';
import React, { useEffect } from 'react';
import { ProjectListItem } from 'types/projectTypes';

const useGetAvailableProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<ProjectListItem[]>([]);

  useSupabaseRealtime({
    channel: 'Projects',
    onAll: () => {
      console.log('REALTIME TRIGGERED UPDATE PROJECTS');
      updateProjects();
    }
  });

  useEffect(() => {
    updateProjects();
  }, []);

  const updateProjects = () => {
    getAvailableProjects().then((res) => setActiveProjectInvestments(res));
  };

  return activeProjectInvestments;
};

export default useGetAvailableProjects;

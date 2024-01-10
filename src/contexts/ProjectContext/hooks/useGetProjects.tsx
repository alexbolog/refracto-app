import { getAvailableProjects } from 'apiRequests/backend';
import { useSupabaseRealtime } from 'hooks/supabase/useSupabaseRealtime';
import React, { useEffect } from 'react';
import { ProjectListItem } from 'types/projectTypes';

const useGetProjects = () => {
  const [allProjects, setAllProjects] = React.useState<ProjectListItem[]>([]);
  const [activeProjects, setActiveProjects] = React.useState<ProjectListItem[]>(
    []
  );
  const [completedProjects, setCompletedProjects] = React.useState<
    ProjectListItem[]
  >([]);
  const [upcomingProjects, setUpcomingProjects] = React.useState<
    ProjectListItem[]
  >([]);

  useSupabaseRealtime({
    channel: 'Projects',
    onAll: () => {
      updateProjects();
    }
  });

  useEffect(() => {
    updateProjects();
  }, []);

  const updateProjects = () => {
    getAvailableProjects().then((res) => {
      setAllProjects(res);

      setActiveProjects(
        res.filter((p) => new Date(p.crowdfundingDeadline) > new Date())
      );
      setCompletedProjects(
        res.filter((p) => new Date(p.crowdfundingDeadline) < new Date())
      );
      // setUpcomingProjects(res.filter((p) => p. === 'Upcoming'));
      // setActiveProjects(res.filter((p) => p.status === 'Active'));
      // setCompletedProjects(res.filter((p) => p.crowdfundingDeadline < new Date()));
    });
  };

  return { allProjects, activeProjects, completedProjects, upcomingProjects };
};

export default useGetProjects;

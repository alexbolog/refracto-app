import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React, { useEffect, useState } from 'react';
import {
  FullProjectPageDetails,
  MarketplaceListing,
  ProjectListItem
} from 'types/projectTypes';
import useGetAvailableProjects from './hooks/useGetAvailableProjects';
import useGetMarketplaceProjects from './hooks/useGetMarketplaceProjects';
import { useGetScProjectDetails } from 'sc/queries/useGetScProjectDetails';
import { getFullProjectInfo } from 'apiRequests/backend';

export interface IProjectContext {
  isLoading: boolean;
  availableProjects: ProjectListItem[];
  marketplaceProjects: MarketplaceListing[];
  getProjectById: (
    projectId: number
  ) => Promise<FullProjectPageDetails | undefined>;
}

const defaultState: IProjectContext = {
  isLoading: true,
  availableProjects: [],
  marketplaceProjects: [],
  getProjectById: async (_) => undefined
};

export const ProjectContext =
  React.createContext<IProjectContext>(defaultState);

export const ProjectContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    account: { address }
  } = useGetAccountInfo();
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableProjects, setAvailableProjects] = useState<ProjectListItem[]>(
    []
  );

  const dbProjects = useGetAvailableProjects();
  const marketplaceProjects = useGetMarketplaceProjects();
  const getScProjects = useGetScProjectDetails();

  const getAvailableScProjectData = async () => {
    return await getScProjects(dbProjects.map((ap) => ap.projectId));
  };

  const getProjectById = async (
    projectId: number
  ): Promise<FullProjectPageDetails | undefined> => {
    const scProject = await getScProjects([projectId]);
    const dbProject = await getFullProjectInfo(projectId);
    if (scProject === undefined || dbProject === undefined) {
      return undefined;
    }

    dbProject.crowdfundedAmount = scProject[0].cf_progress;

    return dbProject;
  };

  const handleUpdateProjectData = (scProjects: any[]) => {
    const updatedAvailableProjects = [];
    for (let i = 0; i < scProjects.length; i++) {
      const project = scProjects[i];
      const dbProject = dbProjects.find(
        (dbp) => dbp.projectId === project.project_id.toNumber()
      );
      if (dbProject === undefined) {
        return;
      }
      dbProject.crowdfundedAmount = project.cf_progress
        .shiftedBy(-6)
        .toNumber();

      updatedAvailableProjects.push(dbProject);
    }
    setAvailableProjects(updatedAvailableProjects);
    setIsLoading(false);
  };

  useEffect(() => {
    if (dbProjects.length === 0) {
      return;
    }
    getAvailableScProjectData().then((scProjects) =>
      handleUpdateProjectData(scProjects)
    );
  }, [dbProjects]);

  return (
    <ProjectContext.Provider
      value={{
        isLoading,
        availableProjects,
        marketplaceProjects,
        getProjectById
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

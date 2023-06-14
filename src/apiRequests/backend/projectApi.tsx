import React from 'react';
import projectList from '../../dbNew/projectList.json';
import projectInfo from '../../dbNew/projectPageNotConnected.json';
import fullProjectInfo from '../../dbNew/fullProjectPageDetails.json';
import secondaryMarketProjects from '../../dbNew/secondaryMarket.json';

import {
  FullProjectPageDetails,
  MarketplaceListing,
  ProjectListItem,
  ProjectPageDetails
} from 'types/projectTypes';
import { fromIso } from '../../utils';

export const getAvailableProjects = (): ProjectListItem[] => {
  return projectList.map((l: any) => l as ProjectListItem);
};

export const getMarketplaceListings = (): MarketplaceListing[] => {
  return secondaryMarketProjects.map((l: any) => l as MarketplaceListing);
};

export const getProjectInfo = (projectId: string): ProjectPageDetails => {
  const proj = (projectInfo.filter(
    (pi) => pi.projectId === projectId
  )[0] as any) as ProjectPageDetails;
  proj.loanDeadline =
    fromIso(proj.crowdfundingDeadline).plus({ years: 1 }).toISO() ?? '';
  return proj;
};

export const getFullProjectInfo = (
  projectId: string
): FullProjectPageDetails => {
  const proj = (fullProjectInfo.filter(
    (pi) => pi.projectId === projectId
  )[0] as any) as FullProjectPageDetails;
  proj.loanDeadline =
    fromIso(proj.crowdfundingDeadline).plus({ years: 1 }).toISO() ?? '';
  return proj;
};

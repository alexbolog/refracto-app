import React from 'react';
import projectList from '../../dbNew/projectList.json';
import projectInfo from '../../dbNew/projectPageNotConnected.json';
import fullProjectInfo from '../../dbNew/fullProjectPageDetails.json';
import {
  FullProjectPageDetails,
  ProjectListItem,
  ProjectPageDetails
} from 'types/projectTypes';

export const getAvailableProjects = (): ProjectListItem[] => {
  return projectList.map((l: any) => l as ProjectListItem);
};

export const getProjectInfo = (projectId: string): ProjectPageDetails => {
  return projectInfo.filter(
    (pi) => pi.ProjectId === projectId
  )[0] as any as ProjectPageDetails;
};

export const getFullProjectInfo = (
  projectId: string
): FullProjectPageDetails => {
  return fullProjectInfo.filter(
    (pi) => pi.ProjectId === projectId
  )[0] as any as FullProjectPageDetails;
};

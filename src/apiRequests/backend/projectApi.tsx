import React from 'react';
import projectList from '../../dbNew/projectList.json';
import projectInfo from '../../dbNew/projectPageNotConnected.json';
import fullProjectInfo from '../../dbNew/fullProjectPageDetails.json';
import secondaryMarketProjects from '../../dbNew/secondaryMarket.json';

import {
  Coordinates,
  FullProjectPageDetails,
  MarketplaceListing,
  ProjectListItem,
  ProjectPageDetails
} from 'types/projectTypes';
import { fromIso } from '../../utils';
import { getProjectList } from 'db/projects';
import { supabase } from 'apiRequests/supabaseClient';

export const getAvailableProjects = async (): Promise<ProjectListItem[]> => {
  // return projectList.map((l: any) => l as ProjectListItem);
  return await getProjectList();
};

export const getMarketplaceListings = (): MarketplaceListing[] => {
  return secondaryMarketProjects.map((l: any) => l as MarketplaceListing);
};

export const getProjectInfo = async (
  projectId: number
): Promise<ProjectPageDetails> => {
  return (await getFullProjectInfo(projectId)) as ProjectPageDetails;
};

export const getFullProjectInfo = async (
  projectId: number
): Promise<FullProjectPageDetails | undefined> => {
  console.log('supabase auth session', await supabase.auth.getSession());
  const { data, error } = await supabase.rpc('get_project_details_by_id', {
    p_id: projectId
  });
  if (error) {
    console.log('Fetch project id error', error);
  }
  console.log('Fetch project response', data);
  return parseProjectInfo(data);
};

const parseProjectInfo = (
  projectResponse: any
): FullProjectPageDetails | undefined => {
  const project = projectResponse[0];
  console.log('parseProjectInfo', project);
  const parsed = {
    projectId: project.id,
    projectTitle: project.title,
    returnPercentage: project.returnpercentage,
    riskRatingLevel: project.riskratinglevel,
    crowdfundingDeadline: project.crowdfundingdeadline,
    crowdfundingTarget: project.crowdfundingtarget,
    crowdfundedAmount: project.crowdfundedamount,
    colorCodeHex: project.colorcodehex,
    thumbnailSrc: project.thumbnailsrc,
    loanDeadline: project.loandeadline,
    images: project.images,
    assetClass: project.assetclass,
    investmentType: project.investmenttype,
    totalParticipantsCount: 0, // TO DO
    projectDeveloperId: project.projectdeveloperid,
    projectDeveloperName: 'TODO', //project.projectDeveloperName,
    amountReturnedSoFar: 0, //project.amountReturnedSoFar, // TO DO
    shortDescription: project.shortdescription,
    executiveSummary: project.executivesummary,
    projectDetails: project.details,
    location: getLocation(project.location),
    sponsorInfo: project.sponsorinfo,
    swotAnalysis: project.analysis,
    refractoRating: project.refractorating,
    capitalStructure: project.capitalstructure,
    repaymentSchedule: [], // project.repaymentSchedule, // TO DO
    financingDetails: project.financingdetails,
    attachmentUrls: project.attachmenturls,
    questionsAndAnswers: [] // project.questionsAndAnswers //TODO
  };
  console.log('Parsed project details', parsed);
  return parsed;
};

const getLocation = (point: string): Coordinates => {
  if (point === null) {
    return {
      x: 0,
      y: 0
    };
  }
  const spl = point.substring(1, point.length - 2).split(',');
  return {
    x: parseFloat(spl[0]),
    y: parseFloat(spl[1])
  };
};

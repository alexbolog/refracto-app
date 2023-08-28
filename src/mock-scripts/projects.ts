import { SWOTAnalysis } from 'types/projectTypes';
import { supabase } from '../apiRequests/supabaseClient';
import projectList from '../dbNew/projectList.json';

function getRiskRating(level: string) {
  if (level.toLowerCase().includes('high')) {
    return 'High';
  }
  if (level.toLowerCase().includes('med')) {
    return 'Medium';
  }
  return 'Low';
}

function getAssetClass(assetClass: string) {
  if (assetClass === 'Residential') {
    return 'Residential';
  }

  if (assetClass === 'Industrial') {
    return 'Industrial';
  }

  return 'Commercial';
}

function getInvestmentType(type: string) {
  if (type === 'Refurbish') {
    return 'Refurbish';
  }

  return 'Development';
}

function getSwotAnalysis(analysis: any): SWOTAnalysis {
  return {
    strengths: [`{${analysis.strengths}}`],
    weaknesses: [`{${analysis.weaknesses}}`],
    opportunities: [`{${analysis.opportunities}}`],
    threats: [`{${analysis.threats}}`]
  };
}

function getPointFromJSON(json: { x: number; y: number }): string {
  return `(${json.x},${json.y})`;
}

async function insertProjects() {
  for (const project of projectList) {
    const { data, error } = await supabase.from('Projects').insert([
      {
        title: project.projectTitle,
        returnPercentage: project.returnPercentage,
        crowdfundingDeadline: project.crowdfundingDeadline,
        crowdfundingTarget: project.crowdfundingTarget,
        crowdfundedAmount: project.crowdfundedAmount,
        colorCodeHex: project.colorCodeHex,
        thumbnailSrc: project.thumbnailSrc,
        loanDeadline: project.crowdfundingDeadline,
        images: project.images,
        ProjectDeveloperId: 1,
        RiskRatingLevel: getRiskRating(project.riskRatingLevel),
        assetClass: getAssetClass(project.assetClass),
        investmentType: getInvestmentType(project.investmentType),
        shortDescription: project.shortDescription,
        executiveSummary: project.executiveSummary,
        details: project.projectDetails,
        location: getPointFromJSON(project.location),
        sponsorInfo: project.sponsorInfo,
        analysis: getSwotAnalysis(project.swotAnalysis),
        refractoRating: project.refractoRating,
        capitalStructure: project.capitalStructure,
        financingDetails: project.financingDetails,
        attachmentUrls: project.attachmentUrls
      }
    ]);
    if (error) {
      console.error('Error inserting project: ', error);
    } else {
      console.log('Successfully inserted project: ', data);
    }
  }
}

export default insertProjects;

import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
import { RatingTable } from './RatingTable';
import { RiskLevelBox } from './RiskLevelBox';
import './style.css';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';

export const RefractoRating = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
    <MobileCollapsibleSection
      header='Refracto Rating'
      body={
        <>
          <RiskLevelBox riskLevel={project.riskRatingLevel} />
          <RatingTable
            ratings={project.refractoRating}
            riskLevel={project.riskRatingLevel}
          />
          <div className='refracto-rating-disclaimer'>
            The above-mentioned rating expresses Refracto&apos;s subjective view
            on each investment opportunity&apos;s total risk level. Refracto
            Rating does not account for specific investor&apos;s risk tolerance
            and is not meant to serve as replacement for individual due
            diligence. Refracto Rating has no relations to ratings issued by
            international rating agencies nor to their rating methodologies.
            <br />
            <br />
            Refracto Rating is an expression of investment opportunity&apos;s
            aggregated risk level, calculated as a sum of qualitative and
            quantitative evaluations of opportunitiy&apos;s different
            parameters. Amongst other criteria, Refracto Rating considers
            investment opportunity&apos;s capital structure, financial leverage,
            location, stage, cash flows, teams&apos;s track record, collaterals
            etc.
          </div>
        </>
      }
    />
  );
};
import React, { useState } from 'react';
import { AppliedFilter } from './AppliedFilter';
import { FilterBox } from './FilterBox';
import { ProjectListFilterType } from './ProjectListFilterType';
import './style.css';

export const Filters = ({
  onApplyFilters
}: {
  onApplyFilters: (selectedFilters: ProjectListFilterType) => void;
}) => {
  // three places to handle filters:
  // 1. filter selector -> FilterBox component
  // 2. filter state manager -> this component
  // 3. filter applier -> any component that uses this component
  const [minReturnRange, setMinReturnRange] = useState<number | undefined>();
  const [maxReturnRange, setMaxReturnRange] = useState<number | undefined>();
  const [riskRatingLevels, setRiskRatingLevels] = useState<string[]>([]);
  const [projectDeadlineStart, setProjectDeadlineStart] = useState<
    number | undefined
  >();
  const [projectDeadlineEnd, setProjectDeadlineEnd] = useState<
    number | undefined
  >();

  const getNewFilters = (): ProjectListFilterType => {
    return {
      minReturnRange: minReturnRange,
      maxReturnRange: maxReturnRange,
      riskRatingLevels: riskRatingLevels,
      projectDeadlineStart: projectDeadlineStart,
      projectDeadlineEnd: projectDeadlineEnd
    };
  };

  const handleApplyFilters = (newFilters: ProjectListFilterType) => {
    setMinReturnRange(newFilters.minReturnRange);
    setMaxReturnRange(newFilters.maxReturnRange);
    setRiskRatingLevels(newFilters.riskRatingLevels ?? []);
    setProjectDeadlineStart(newFilters.projectDeadlineStart);
    setProjectDeadlineEnd(newFilters.projectDeadlineEnd);
    onApplyFilters(newFilters);
  };

  const handleRemoveFilter = (action: () => void) => {
    action();
    handleApplyFilters(getNewFilters());
  };

  return (
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col-12'>
          <FilterBox onApplyFilters={handleApplyFilters} />
        </div>
        <div className='col applied-filters-container'>
          {/* <AppliedFilter filterText='Return range' filterValue='45%' /> */}
          {(minReturnRange !== undefined || maxReturnRange !== undefined) && (
            <AppliedFilter
              filterText='Return range'
              filterValue={`${
                minReturnRange === undefined ? '0' : minReturnRange
              }% - ${maxReturnRange === undefined ? '100' : maxReturnRange}%`}
              onRemoveFilter={() =>
                handleRemoveFilter(() => {
                  setMinReturnRange(undefined);
                  setMaxReturnRange(undefined);
                })
              }
            />
          )}
          {riskRatingLevels !== undefined && riskRatingLevels.length > 0 && (
            <AppliedFilter
              filterText='Rating'
              filterValue={riskRatingLevels.join(',')}
              onRemoveFilter={() =>
                handleRemoveFilter(() => {
                  setRiskRatingLevels([]);
                })
              }
            />
          )}
          {projectDeadlineStart !== undefined &&
            projectDeadlineEnd === undefined && (
              <AppliedFilter
                filterText='After'
                filterValue={'TODO: add value'} //Project deadline start online
                onRemoveFilter={() =>
                  handleRemoveFilter(() => {
                    setProjectDeadlineStart(undefined);
                  })
                }
              />
            )}
          {projectDeadlineStart === undefined &&
            projectDeadlineEnd !== undefined && (
              <AppliedFilter
                filterText='Before'
                filterValue={'TODO: add value'} //Project deadline start online
                onRemoveFilter={() =>
                  handleRemoveFilter(() => {
                    setProjectDeadlineEnd(undefined);
                  })
                }
              />
            )}
          {projectDeadlineStart !== undefined &&
            projectDeadlineEnd !== undefined && (
              <AppliedFilter
                filterText=''
                filterValue={'full date range here'} //Project deadline start online
                onRemoveFilter={() =>
                  handleRemoveFilter(() => {
                    setProjectDeadlineStart(undefined);
                    setProjectDeadlineEnd(undefined);
                  })
                }
              />
            )}
        </div>
      </div>
    </div>
  );
};

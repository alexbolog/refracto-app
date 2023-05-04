import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getIsMobile } from 'utils';
import { ProjectListFilterType } from '../ProjectListFilterType';
import { DeadlineSelectAndSettings } from './DeadlineSelectAndSettings';
import { RatingSelect } from './RatingSelect';
import { ReturnRangeSelect } from './ReturnRangeSelect';
import { DateTime } from 'luxon';

export const FilterBox = ({
  onApplyFilters
}: {
  onApplyFilters: (selectedFilters: ProjectListFilterType) => void;
}) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<ProjectListFilterType>(
    {}
  );

  const handleUpdateInput = (value: string) => {
    setSearchInput(value);
  };

  useEffect(() => {
    handleApplyFilters();
  }, [searchInput]);

  const handleApplyFilters = () => {
    const currentFilters: ProjectListFilterType = {
      nameSearch: searchInput
    };
    onApplyFilters(currentFilters);
  };

  const handleRangeSelectFilterUpdate = (min: number, max: number) => {
    const co = selectedFilter;
    co.minReturnRange = min;
    co.maxReturnRange = max;
    setSelectedFilter(co);
    onApplyFilters(co);
  };

  const handleRatingSelectFilterUpdate = (ratings: string[]) => {
    const co = selectedFilter;
    co.riskRatingLevels = ratings;
    setSelectedFilter(co);
    onApplyFilters(co);
  };

  const handleDeadlineSelectChange = (start: DateTime, end: DateTime) => {
    const co = selectedFilter;
    co.projectDeadlineStart = start;
    co.projectDeadlineEnd = end;
    setSelectedFilter(co);
    onApplyFilters(co);
  };

  return (
    <div className='card w-100 filter-box-wrapper'>
      <div className='card-body border-0'>
        <div className='container-fluid p-0 m-0'>
          <div className='row'>
            <div
              className='col-lg-6 col-sm-10 col-md-10 w-auto'
              style={{ minWidth: '50%' }}
            >
              <div className='input-group search-bar-container'>
                <span className='input-group-text search-icon'>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='text-primary'
                  />
                </span>
                <input
                  type='text'
                  className='form-control h-100 search-bar-input'
                  placeholder='Search for a project'
                  onChange={(e) => handleUpdateInput(e.target.value)}
                />
              </div>
            </div>
            <div className='col-lg-6 col-sm-2 col-md-2 d-flex justify-content-end ml-auto w-auto filter-box-buttons'>
              <ReturnRangeSelect onChange={handleRangeSelectFilterUpdate} />
              <RatingSelect onChange={handleRatingSelectFilterUpdate} />
              <DeadlineSelectAndSettings onChange={handleDeadlineSelectChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

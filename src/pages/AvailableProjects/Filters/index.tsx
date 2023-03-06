import React from 'react';
import { AppliedFilter } from './AppliedFilter';
import { FilterBox } from './FilterBox';
import { ProjectListFilterType } from './ProjectListFilterType';
import './style.css';

export const Filters = ({
  onApplyFilters
}: {
  onApplyFilters: (selectedFilters: ProjectListFilterType) => void;
}) => {
  return (
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col-12'>
          <FilterBox onApplyFilters={onApplyFilters} />
        </div>
        <div className='col applied-filters-container'>
          <AppliedFilter filterText='Return range' filterValue='45%' />
        </div>
      </div>
    </div>
  );
};

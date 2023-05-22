import { Filters } from 'components/Filters';
import { ProjectContext } from 'contexts/ProjectContext';
import * as React from 'react';
import { useContext } from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { AvailableListings } from './AvailableListings';
import './style.css';
import { ReactComponent as EmptyPageScreen } from './../../assets/icons/refracto/empty-page-secondary-market.svg';
import { FiltersV2 } from 'components/FiltersV2';

const Marketplace = () => {
  const { marketplaceProjects } = useContext(ProjectContext);

  const [filteredProjects, setFilteredProjects] =
    React.useState<ProjectListItem[]>(marketplaceProjects);

  const handleApplyFilters = (filteredItems: ProjectListItem[]) => {
    setFilteredProjects(filteredItems);
  };

  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col-12'>
          <h1>Secondary Market</h1>
        </div>
      </div>
      <div className='row'>
        {marketplaceProjects.length > 0 && (
          <div className='col-12'>
            <FiltersV2
              items={marketplaceProjects}
              onFilterChange={handleApplyFilters}
            />
          </div>
        )}
        <div className='col-12'>
          {filteredProjects.length > 0 && (
            <AvailableListings listings={filteredProjects} />
          )}
        </div>
        {(filteredProjects.length === 0 ||
          marketplaceProjects.length === 0) && (
          <>
            <div className='col-12 text-center mb-5 mt-5'>
              {marketplaceProjects.length > 0
                ? 'Uh oh! Seems like no project is matching your filters'
                : 'Ups! Please come back later. More projects coming soon.'}
            </div>
            <div className='col-12 text-center'>
              {marketplaceProjects.length === 0 && (
                <h1 className='text-primary' role='button'>
                  Meanwhile, Check Our Demo!
                </h1>
              )}
            </div>
            <div className='col-12 text-center'>
              <EmptyPageScreen />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

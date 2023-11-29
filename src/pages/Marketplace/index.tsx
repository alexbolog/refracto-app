import * as React from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { useContext } from 'react';
import { MarketplaceListing, ProjectListItem } from 'types/projectTypes';
import { AvailableListings } from './AvailableListings';
import './style.css';
import { ReactComponent as EmptyPageScreen } from './../../assets/icons/refracto/empty-page-secondary-market.svg';
import { FiltersV2 } from 'components/FiltersV2';
import { EXPECTED_ROR_FILTER } from 'components/FiltersV2/Filters/ExpectedRORFilter';
import { getExpectedRemainingDaysFilter } from 'components/FiltersV2/Filters/RemainingDaysFilter';
import { getPriceRangeFilter } from 'components/FiltersV2/Filters/PriceRangeFilter';

const Marketplace = () => {
  // const { marketplaceProjects } = useContext(ProjectContext);

  const [marketplaceProjects, _] = React.useState<MarketplaceListing[]>([]);
  const [filteredProjects, setFilteredProjects] = React.useState<
    MarketplaceListing[]
  >([]);

  const handleApplyFilters = (filteredItems: MarketplaceListing[]) => {
    setFilteredProjects(filteredItems);
  };

  const filters = [
    EXPECTED_ROR_FILTER,
    getExpectedRemainingDaysFilter(
      0,
      Math.max.apply(
        null,
        marketplaceProjects.map((mp) => mp.daysLeft)
      )
    ),
    getPriceRangeFilter(
      0,
      Math.round(
        Math.max.apply(
          null,
          marketplaceProjects.map((mp) => mp.price)
        )
      )
    )
  ];

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
              filters={filters}
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
              {[marketplaceProjects].length > 0
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
              <EmptyPageScreen className='img-responsive' />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

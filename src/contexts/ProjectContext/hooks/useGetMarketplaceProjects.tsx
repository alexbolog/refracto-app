import { getMarketplaceListings } from 'apiRequests/backend';
import React from 'react';
import { MarketplaceListing } from 'types/projectTypes';

const useGetMarketplaceProjects = () => {
  const [marketplaceListings, setActiveProjectInvestments] = React.useState<
    MarketplaceListing[]
  >(getMarketplaceListings());

  return marketplaceListings;
};

export default useGetMarketplaceProjects;

import { getAvailableProjects } from 'apiRequests/backend';
import React from 'react';
import { MarketplaceListing } from 'types/projectTypes';

const useGetMarketplaceProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<MarketplaceListing[]>(getAvailableProjects());

  return activeProjectInvestments;
};

export default useGetMarketplaceProjects;

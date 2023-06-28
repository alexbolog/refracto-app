import React, { useState } from 'react';
import { ProfileInfo } from '../types/ProfileInfo';
import { DocumentAgreement, InvestmentTransaction } from 'types/accountTypes';
import { getDocumentAgreements } from 'apiRequests/backend/accountApi';

const useGetDocumentAgreements = () => {
  const [documentAgreements, _] = useState<DocumentAgreement[]>(
    getDocumentAgreements()
  );

  return documentAgreements;
};

export default useGetDocumentAgreements;

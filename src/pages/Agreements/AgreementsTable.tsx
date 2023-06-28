import { DateTime } from 'luxon';
import React from 'react';
import { DocumentAgreement, DocumentAgreementStatus } from 'types/accountTypes';
import { formatDate } from 'utils';

export const AgreementsTable = ({
  agreements
}: {
  agreements: DocumentAgreement[];
}) => {
  const getStatusClass = (status: DocumentAgreementStatus) => {
    switch (status) {
      case DocumentAgreementStatus.Signed:
        return 'status-finished';
      case DocumentAgreementStatus.Unsigned:
        return 'status-pending';
      default:
        return 'status-cancelled';
    }
  };

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='table-responsive'>
          <div className='agreements-table'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col' className='date'>
                    Date
                  </th>
                  <th scope='col'>Agreement</th>
                  <th scope='col'>Investment Opportunity</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>
                    <div className='td-center'>Document Type</div>
                  </th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((docAgr, index) => (
                  <tr
                    key={`document-agreements-${index}-${docAgr.agreementId}`}
                  >
                    <th scope='row'>
                      {formatDate(
                        DateTime.fromISO(docAgr.date),
                        DateTime.DATETIME_SHORT
                      )}
                    </th>
                    <td>{docAgr.agreementId}</td>
                    <td>{docAgr.projectName}</td>
                    <td className={`status ${getStatusClass(docAgr.status)}`}>
                      {DocumentAgreementStatus[docAgr.status]}
                    </td>
                    <td className='td-center'>{docAgr.documentType}</td>
                    <td>
                      <a href='#'>Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

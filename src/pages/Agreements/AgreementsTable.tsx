// import { DateTime } from 'luxon';
// import React from 'react';
// import { DocumentAgreement, DocumentAgreementStatus } from 'types/accountTypes';
// import { formatDate } from 'utils';

// export const AgreementsTable = ({
//   agreements
// }: {
//   agreements: DocumentAgreement[];
// }) => {
//   const getStatusClass = (status: DocumentAgreementStatus) => {
//     switch (status) {
//       case DocumentAgreementStatus.Signed:
//         return 'status-finished';
//       case DocumentAgreementStatus.Unsigned:
//         return 'status-pending';
//       default:
//         return 'status-cancelled';
//     }
//   };

//   return (
//     <div className='card'>
//       <div className='card-body'>
//         <div className='table-responsive'>
//           <div className='agreements-table'>
//             <table className='table'>
//               <thead>
//                 <tr>
//                   <th scope='col' className='date'>
//                     Date
//                   </th>
//                   <th scope='col'>Agreement</th>
//                   <th scope='col'>Investment Opportunity</th>
//                   <th scope='col'>Status</th>
//                   <th scope='col'>
//                     <div className='td-center'>Document Type</div>
//                   </th>
//                   <th scope='col'></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {agreements.map((docAgr, index) => (
//                   <tr
//                     key={`document-agreements-${index}-${docAgr.agreementId}`}
//                   >
//                     <th scope='row'>
//                       {formatDate(
//                         DateTime.fromISO(docAgr.date),
//                         DateTime.DATETIME_SHORT
//                       )}
//                     </th>
//                     <td>{docAgr.agreementId}</td>
//                     <td>{docAgr.projectName}</td>
//                     <td className={`status ${getStatusClass(docAgr.status)}`}>
//                       {DocumentAgreementStatus[docAgr.status]}
//                     </td>
//                     <td className='td-center'>{docAgr.documentType}</td>
//                     <td>
//                       <a href='#'>Download</a>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { DocumentAgreementStatus } from 'types/accountTypes';
import { formatDate } from 'utils';

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
export const columns: ColumnDef<DocumentAgreementStatus>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (row) => {
      return (
        <>
          {formatDate(
            DateTime.fromISO(row.getValue() as string),
            DateTime.DATETIME_SHORT
          )}
        </>
      );
    }
  },
  {
    header: (_) => <div className='td-center'>Agreement</div>,
    accessorKey: 'agreementId',
    enableSorting: false,
    cell: (row) => <div className='td-center'>{row.getValue() as string}</div>
  },
  {
    header: 'Project Name',
    accessorKey: 'projectName'
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => {
      return (
        <div
          className={`status ${getStatusClass(
            row.getValue() as DocumentAgreementStatus
          )}`}
        >
          {DocumentAgreementStatus[row.getValue() as DocumentAgreementStatus]}
        </div>
      );
    }
  },
  {
    header: 'Document Type',
    accessorKey: 'documentType'
  },
  {
    header: '',
    accessorKey: 'filePath',
    cell: (row) => {
      return <a href='#'>Download</a>;
    },
    enableSorting: false
  }
];

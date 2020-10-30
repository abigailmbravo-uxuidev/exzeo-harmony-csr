import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, date, format, SectionLoader } from '@exzeo/core-ui';
import { PREMIUM_ENDORSEMENTS } from './constants/policy';
import { useFetchEndorsements } from './hooks';

const formatDate = _date => date.formatDate(_date, 'MM/DD/YYYY');

const PreviousEndorsements = ({ initialValues }) => {
  const { endorsements, loaded = false } = useFetchEndorsements(initialValues);
  const { pendingEndorsements = [], pastEndorsements = [] } = endorsements;

  const endorsementsForTable = () => {
    const normalizedPendingEndorsements = pendingEndorsements.map(
      endorsement => ({
        ...endorsement,
        effectiveDate: initialValues.endDate,
        formattedNetCharge: null
      })
    );
    // Only premium endorsements should show an Amount in the table;
    const normalizedPastEndorsements = pastEndorsements.map(endorsement => {
      if (PREMIUM_ENDORSEMENTS.includes(endorsement.transactionType)) {
        endorsement.formattedNetCharge = endorsement.netCharge;
      } else {
        endorsement.formattedNetCharge = null;
      }
      return endorsement;
    });

    const allEndorsementsSorted = [
      ...normalizedPastEndorsements,
      ...normalizedPendingEndorsements
    ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

    return allEndorsementsSorted;
  };

  const rowClasses = row => {
    if (!row || !row.effectiveDate) return;

    const effectiveDate = formatDate(row.effectiveDate, 'MM-DD-YYYY');
    const formattedEndDate = formatDate(initialValues.endDate, 'MM-DD-YYYY');
    if (effectiveDate === formattedEndDate) {
      return 'future-endorsement';
    }
  };

  const columns = [
    {
      dataField: 'effectiveDate',
      text: 'Effective Date',
      formatter: formatDate
    },
    {
      dataField: 'formattedNetCharge',
      text: 'Amount',
      formatter: val => (!val ? 'N/A' : format.toCurrency(val, 2))
    },
    {
      dataField: 'transactionType',
      text: 'Type'
    },
    {
      dataField: 'createdAt',
      text: 'Processed Date',
      formatter: formatDate
    }
  ];

  return (
    <section>
      <h3 data-test="Previous Endorsements">Endorsements</h3>
      {!loaded ? (
        <SectionLoader />
      ) : (
        <BootstrapTable
          data={endorsementsForTable()}
          keyField="_id"
          columns={columns}
          noDataIndication="There is no data to display"
          striped
          hover
          bordered={false}
          rowClasses={rowClasses}
        />
      )}
    </section>
  );
};

PreviousEndorsements.propTypes = {
  initialValues: PropTypes.shape({
    policyNumber: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired
  })
};

export default PreviousEndorsements;

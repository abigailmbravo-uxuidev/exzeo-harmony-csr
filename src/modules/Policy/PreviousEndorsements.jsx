import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const dateFormatter = cell => `${cell.substring(0, 10)}`;

const PreviousEndorsements = ({ options: { endorsementHistory } }) => (
  <section>
    <h3>Previous Endorsements</h3>
    <BootstrapTable data={endorsementHistory}>
      <TableHeaderColumn
        width="25%"
        headerAlign="left"
        dataAlign="left"
        dataField="effectiveDate"
        isKey
        dataFormat={dateFormatter}
      >
        Effective Date
      </TableHeaderColumn>
      <TableHeaderColumn
        width="25%"
        headerAlign="left"
        dataAlign="left"
        dataField="netChargeFormat"
      >
        Amount
      </TableHeaderColumn>
      <TableHeaderColumn
        width="25%"
        headerAlign="left"
        dataAlign="left"
        dataField="transactionType"
      >
        Type
      </TableHeaderColumn>
      <TableHeaderColumn
        width="25%"
        headerAlign="left"
        dataAlign="left"
        dataField="createdAt"
        dataFormat={dateFormatter}
      >
        Processed Date
      </TableHeaderColumn>
    </BootstrapTable>
  </section>
);

PreviousEndorsements.propTypes = {};

PreviousEndorsements.defaultProps = {};

export default PreviousEndorsements;

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const claimsData = [];
const options = {
  defaultSortName: 'jeLossNo',
  defaultSortOrder: 'desc'
};

function Claims() {
  return (
    <React.Fragment>
      <h3>Claims</h3>
      {/*change to props claims when endpoint is ready*/}
      <BootstrapTable data={claimsData} options={options}>
        <TableHeaderColumn isKey dataField="jeLossNo" width="10%">
          Claim No
        </TableHeaderColumn>
        <TableHeaderColumn dataField="dateLoss" width="10%">
          Date Loss
        </TableHeaderColumn>
        <TableHeaderColumn dataField="reportDate" width="10%">
          Report Date
        </TableHeaderColumn>
        <TableHeaderColumn dataField="closeDate" width="10%">
          Close Date
        </TableHeaderColumn>
        <TableHeaderColumn dataField="lossStatus" width="20%">
          Status
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="lossDesc"
          width="30%"
          tdStyle={{ whiteSpace: 'normal' }}
        >
          Description
        </TableHeaderColumn>
      </BootstrapTable>
    </React.Fragment>
  );
}

export default Claims;

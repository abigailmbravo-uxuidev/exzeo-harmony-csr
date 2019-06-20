import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = cell =>
  cell.$numberDecimal
    ? Number(cell.$numberDecimal).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    : '';

function Payments({ payments }) {
  const options = {
    defaultSortName: 'date',
    defaultSortOrder: 'desc'
  };

  return (
    <BootstrapTable
      className=""
      data={payments}
      options={options}
      striped
      hover
    >
      <TableHeaderColumn
        isKey
        dataField="date"
        dataFormat={dateFormatter}
        className="date"
        columnClassName="date"
        width="150"
        dataSort
      >
        Date
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="type"
        className="type"
        columnClassName="type"
        dataSort
        width="150"
      >
        Type
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="description"
        className="description"
        columnClassName="description"
        dataSort
      >
        Description
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="batch"
        className="note"
        columnClassName="note"
        dataSort
        width="200"
      >
        Note
      </TableHeaderColumn>
      <TableHeaderColumn
        dataField="amount"
        dataFormat={amountFormatter}
        className="amount"
        columnClassName="amount"
        width="150"
        dataSort
        dataAlign="right"
      >
        Amount
      </TableHeaderColumn>
    </BootstrapTable>
  );
}

Payments.propTypes = {
  payments: PropTypes.array
};

Payments.defaultProps = {
  payments: []
};

export default Payments;

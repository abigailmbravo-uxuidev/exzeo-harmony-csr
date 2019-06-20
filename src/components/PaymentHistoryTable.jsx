import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const amountFormatter = cell =>
  cell
    ? Number(cell).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    : '';
const dateFormatter = cell => `${cell.substring(0, 10)}`;

const PaymentHistoryTable = ({ paymentHistory }) => (
  <div className="table-view">
    <BootstrapTable className="" data={paymentHistory} striped hover>
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
        dataField="amountDisplay"
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
  </div>
);

PaymentHistoryTable.defaultProps = {};

export default PaymentHistoryTable;

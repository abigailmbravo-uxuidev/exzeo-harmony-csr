import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment-timezone';

export const SearchPanel = props => (
  <div className="search">
    <label>Search Table Data</label>
    {props.searchField}
  </div>
);

const toLocaleDate = dataString => moment.utc(dataString).format('MM/DD/YYYY');

const toNameFormatter = val => val.userName;

const DiaryExpandColumns = ({ diaries }) => {
  return (
    <BootstrapTable data={diaries}>
      <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn dataField="due" dataFormat={toLocaleDate}>Due</TableHeaderColumn>
      <TableHeaderColumn dataField="assignee" dataFormat={toNameFormatter}>Assignee</TableHeaderColumn>
      <TableHeaderColumn dataField="reason">Reason</TableHeaderColumn>
      <TableHeaderColumn dataField="message">Message</TableHeaderColumn>
      <TableHeaderColumn dataField="updatedAt" dataFormat={toLocaleDate}>Updated</TableHeaderColumn>
      <TableHeaderColumn dataField="createdBy" dataFormat={toNameFormatter}>UpdatedBy</TableHeaderColumn>
    </BootstrapTable>
  );
};
export class DiaryTable extends Component {
  isExpandableRow(row) {
    if (row.diaryHistory.length > 0) return true;
    return false;
  }

  expandComponent(row) {
    return (
      <DiaryExpandColumns diaries={row.diaryHistory} />
    );
  }

  expandColumnComponent({ isExpanded }) {
    return (
      <div> {(isExpanded ? '(-)' : '(+)')} </div>
    );
  }
  render() {
    const options = { searchPanel: props => (<SearchPanel {...props} />) };

    return (
      <BootstrapTable
        data={this.props.diaries}
        options={options}
        search
        multiColumnSearch
        expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
        expandColumnOptions={{
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent
        }}>
        <TableHeaderColumn dataField="diaryId" isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn dataField="dueStatus">Status</TableHeaderColumn>
        <TableHeaderColumn dataField="due" dataFormat={toLocaleDate}>Due</TableHeaderColumn>
        <TableHeaderColumn dataField="assignee" dataFormat={toNameFormatter}>Assignee</TableHeaderColumn>
        <TableHeaderColumn dataField="reason">Reason</TableHeaderColumn>
        <TableHeaderColumn dataField="message">Message</TableHeaderColumn>
        <TableHeaderColumn dataField="updatedAt" dataFormat={toLocaleDate}>Updated</TableHeaderColumn>
        <TableHeaderColumn dataField="createdBy" dataFormat={toNameFormatter}>UpdatedBy</TableHeaderColumn>
      </BootstrapTable>);
  }
}

export default DiaryTable;

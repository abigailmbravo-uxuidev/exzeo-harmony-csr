import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { date } from '@exzeo/core-ui';

import { SearchPanel } from './SearchPanel';
import { DIARY_STATUS_COLOR, DIARY_STATUS } from '../constants';


const DiaryExpandColumns = ({ diaries }) => {
  return (
    <BootstrapTable className="sub-table" data={diaries}>
      <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn className="due" columnClassName="due" dataField="due" dataFormat={val => date.formatDate(val)}>Due</TableHeaderColumn>
      <TableHeaderColumn className="assignee" columnClassName="assignee" dataField="assignee" dataFormat={val => val.displayName}>Assignee</TableHeaderColumn>
      <TableHeaderColumn className="reason" columnClassName="reason" dataField="reason">Reason</TableHeaderColumn>
      <TableHeaderColumn className="message" columnClassName="message" dataField="message">Message</TableHeaderColumn>
      <TableHeaderColumn className="updated-at" columnClassName="updated-at" dataField="createdAt" dataFormat={val => date.formatDate(val)}>Updated</TableHeaderColumn>
      <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataFormat={val => val.userName}>Updated By</TableHeaderColumn>
    </BootstrapTable>
  );
};


class DiaryTable extends Component {
  isExpandableRow = (row) => {
    return row.diaryHistory.length > 0;

  };

  expandComponent = (row) => {
    return (
      <DiaryExpandColumns diaries={row.diaryHistory} />
    );
  };

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    if (!isExpandableRow) return null;
    return (
      isExpanded ? <span><i className="fa fa-caret-square-o-up" /></span> :
      <span><i className="fa fa-caret-square-o-down" /></span>
    );
  };

  openDiaryModal = (cell) => {
    const { customHandlers, entityEndDate } = this.props;
    const {
      resourceType, resourceId, ...selectedDiary
    } = cell;

    customHandlers.toggleDiary({
      resourceType,
      resourceId,
      selectedDiary,
      entityEndDate
    });
  }

  // TODO: Use button from core-ui
  buttonFormatter = (cell) => {
    return cell.open
      ? <button type="button" className="btn btn-link btn-grid-row" onClick={() => this.openDiaryModal(cell)}><i className="fa fa-chevron-circle-up" /></button>
      : null;
  };

  statusFormatter = (value) => {
    return (<div className="status-indicator"><span className={DIARY_STATUS_COLOR[value]} /><span className="status-display">{DIARY_STATUS[value]}</span></div>);
  };

  render() {
    const options = { expandBy: 'column', searchPanel: props => (<SearchPanel {...props} />) };
    const { diaries } = this.props;
    return (
      <BootstrapTable
        striped
        className="diaries compact-table"
        data={diaries}
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
        <TableHeaderColumn className="due-status" columnClassName="due-status" dataField="dueStatus" dataFormat={this.statusFormatter} dataSort>Status</TableHeaderColumn>
        <TableHeaderColumn className="due" columnClassName="due" dataField="due" dataFormat={val => date.formatDate(val)} dataSort>Due</TableHeaderColumn>
        <TableHeaderColumn className="assignee" columnClassName="assignee" dataField="assignee" dataFormat={val => val.displayName} dataSort>Assignee</TableHeaderColumn>
        <TableHeaderColumn className="reason" columnClassName="reason" dataField="reason" dataSort>Reason</TableHeaderColumn>
        <TableHeaderColumn className="message" columnClassName="message" dataField="message">Message</TableHeaderColumn>
        <TableHeaderColumn className="updated-at" columnClassName="updated-at" dataField="createdAt" dataFormat={val => date.formatDate(val)} dataSort>Updated</TableHeaderColumn>
        <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataFormat={val => val.userName} dataSort>Updated By</TableHeaderColumn>
        <TableHeaderColumn className="action" columnClassName="action" dataField="action" dataFormat={this.buttonFormatter} expandable={false}>Actions</TableHeaderColumn>
      </BootstrapTable>);
  }
}


export default DiaryTable;

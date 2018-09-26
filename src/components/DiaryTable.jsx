import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment-timezone';
import { connect } from 'react-redux';

import { toggleDiary } from '../state/actions/ui.actions';
import { getFilteredAllDiaries } from '../state/selectors/diary.selectors';

// TODO: Move to component
export const SearchPanel = props => (
  <div className="search">
    <label>Search Table Data</label>
    {props.searchField}
  </div>
);

// TODO: Use from core-ui
const toLocaleDate = dataString => moment.utc(dataString).format('MM/DD/YYYY');

// TODO: Move to component
const DiaryExpandColumns = ({ diaries }) => {
  return (
    <BootstrapTable data={diaries}>
      <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="due" dataFormat={toLocaleDate}>Due</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="assignee" dataFormat={val => val.displayName}>Assignee</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="reason">Reason</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="message">Message</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="updatedAt" dataFormat={toLocaleDate}>Updated</TableHeaderColumn>
      <TableHeaderColumn width="15%" dataField="createdBy" dataFormat={val => val.userName}>UpdatedBy</TableHeaderColumn>
    </BootstrapTable>
  );
};

const DIARY_STATUS = {
  pastDue: 'OPEN | Past Due',
  dueSoon: 'OPEN | Due Soon',
  upComing: 'OPEN | Upcoming',
  closed: 'CLOSED'
};

const DIARY_STATUS_COLOR = {
  pastDue: 'red',
  dueSoon: 'yellow',
  upComing: 'green',
  closed: 'gray'
};

export class DiaryTable extends Component {
  isExpandableRow = (row) => {
    if (row.diaryHistory.length > 0) return true;
    return false;
  }

  expandComponent = (row) => {
    return (
      <DiaryExpandColumns diaries={row.diaryHistory} />
    );
  }

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    if (!isExpandableRow) return null;
    return (
      isExpanded ? <span><i className="fa fa-caret-square-o-up" /></span> :
      <span><i className="fa fa-caret-square-o-down" /></span>
    );
  }

  openDiaryModal = (cell) => {
    const { toggleDiaryAction } = this.props;
    const { resourceType, resourceId, ...selectedDiary } = cell;

    toggleDiaryAction({
      resourceType,
      resourceId,
      selectedDiary
    });
  }

  // TODO: Use button from core-ui
  buttonFormatter = (cell) => {
    return <button type="button" onClick={() => this.openDiaryModal(cell)}><i className="fa fa-arrow-circle-up" /></button>;
  }

  statusFormatter = (value) => {
    return (<div><span>{DIARY_STATUS_COLOR[value]}</span> | <span>{DIARY_STATUS[value]}</span></div>);
  }

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
        <TableHeaderColumn width="12%" dataField="dueStatus" dataFormat={this.statusFormatter}>Status</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="due" dataFormat={toLocaleDate}>Due</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="assignee" dataFormat={val => val.displayName}>Assignee</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="reason">Reason</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="message">Message</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="updatedAt" dataFormat={toLocaleDate}>Updated</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="createdBy" dataFormat={val => val.userName}>UpdatedBy</TableHeaderColumn>
        <TableHeaderColumn width="12%" dataField="action" dataFormat={this.buttonFormatter} expandable={false}>Actions</TableHeaderColumn>
      </BootstrapTable>);
  }
}

const mapStateToProps = (state, ownProps) => {
  const resource = ownProps.match.path.split('/')[1];
  return {
    diaries: getFilteredAllDiaries(state, resource) || []
  };
};

export default connect(mapStateToProps, {
  toggleDiaryAction: toggleDiary
})(DiaryTable);

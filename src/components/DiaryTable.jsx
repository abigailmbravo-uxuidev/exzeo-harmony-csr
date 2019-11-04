import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { date } from '@exzeo/core-ui';

import { DUE_STATUS } from '../constants/diaries';
import { toggleDiary } from '../state/actions/ui.actions';
import { getDiariesForTable } from '../state/selectors/diary.selectors';

// TODO: Move to component
export const SearchPanel = props => (
  <div className="search">
    <label>Search Table Data</label>
    {props.searchField}
  </div>
);

const toLocaleDate = dataString => date.formatDate(dataString);

// TODO: Move to component
const DiaryExpandColumns = ({ diaries }) => {
  return (
    <BootstrapTable className="sub-table" data={diaries}>
      <TableHeaderColumn dataField="_id" isKey hidden>
        ID
      </TableHeaderColumn>
      <TableHeaderColumn
        className="due"
        columnClassName="due"
        dataField="due"
        dataFormat={toLocaleDate}
      >
        Due
      </TableHeaderColumn>
      <TableHeaderColumn
        className="assignee"
        columnClassName="assignee"
        dataField="assignee"
        dataFormat={val => val.displayName}
      >
        Assignee
      </TableHeaderColumn>
      <TableHeaderColumn
        className="reason"
        columnClassName="reason"
        dataField="reason"
      >
        Reason
      </TableHeaderColumn>
      <TableHeaderColumn
        className="message"
        columnClassName="message"
        dataField="message"
        dataFormat={msg => (msg ? msg.replace(/\r|\n/g, '<br />') : '')}
      >
        Message
      </TableHeaderColumn>
      <TableHeaderColumn
        className="updated-at"
        columnClassName="updated-at"
        dataField="createdAt"
        dataFormat={toLocaleDate}
      >
        Updated
      </TableHeaderColumn>
      <TableHeaderColumn
        className="created-by"
        columnClassName="created-by"
        dataField="createdBy"
        dataFormat={val => val.userName}
      >
        Updated By
      </TableHeaderColumn>
    </BootstrapTable>
  );
};

const DIARY_STATUS = {
  pastDue: `OPEN | ${DUE_STATUS.pastDue}`,
  dueSoon: `OPEN | ${DUE_STATUS.dueSoon}`,
  upComing: `OPEN | ${DUE_STATUS.upComing}`,
  closed: 'CLOSED'
};

const DIARY_STATUS_COLOR = {
  pastDue: 'red',
  dueSoon: 'yellow',
  upComing: 'green',
  closed: 'gray'
};

export class DiaryTable extends Component {
  isExpandableRow = row => {
    if (row.diaryHistory.length > 0) return true;
    return false;
  };

  expandComponent = row => {
    return <DiaryExpandColumns diaries={row.diaryHistory} />;
  };

  expandColumnComponent = ({ isExpandableRow, isExpanded }) => {
    if (!isExpandableRow) return null;
    return isExpanded ? (
      <span>
        <i className="fa fa-caret-square-o-up" />
      </span>
    ) : (
      <span>
        <i className="fa fa-caret-square-o-down" />
      </span>
    );
  };

  openDiaryModal = cell => {
    const { toggleDiaryAction, entity } = this.props;
    const { resourceType, resourceId, ...selectedDiary } = cell;

    toggleDiaryAction({
      resourceType,
      resourceId,
      selectedDiary,
      entity
    });
  };

  // TODO: Use button from core-ui
  buttonFormatter = cell => {
    return cell.open ? (
      <button
        type="button"
        className="btn btn-link btn-grid-row"
        onClick={() => this.openDiaryModal(cell)}
      >
        <i className="fa fa-chevron-circle-up" />
      </button>
    ) : null;
  };

  statusFormatter = value => {
    return (
      <div className="status-indicator">
        <span className={DIARY_STATUS_COLOR[value]} />
        <span className="status-display">{DIARY_STATUS[value]}</span>
      </div>
    );
  };

  messageFormatter = msg => (msg ? msg.replace(/\r|\n/g, '<br />') : '');

  filterStatus = value => `${DIARY_STATUS_COLOR[value]} ${DIARY_STATUS[value]}`;

  render() {
    const options = {
      expandBy: 'column',
      searchPanel: props => <SearchPanel {...props} />
    };
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
        }}
      >
        <TableHeaderColumn dataField="diaryId" isKey hidden>
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          className="due-status"
          columnClassName="due-status"
          dataField="dueStatus"
          dataFormat={this.statusFormatter}
          filterValue={this.filterStatus}
          dataSort
        >
          Status
        </TableHeaderColumn>
        <TableHeaderColumn
          className="due"
          columnClassName="due"
          dataField="due"
          dataFormat={toLocaleDate}
          dataSort
        >
          Due
        </TableHeaderColumn>
        <TableHeaderColumn
          className="assignee"
          columnClassName="assignee"
          dataField="assignee"
          dataFormat={val => val.displayName}
          filterFormatted
          dataSort
        >
          Assignee
        </TableHeaderColumn>
        <TableHeaderColumn
          className="reason"
          columnClassName="reason"
          dataField="reason"
          dataSort
        >
          Reason
        </TableHeaderColumn>
        <TableHeaderColumn
          className="message"
          columnClassName="message"
          dataField="message"
          dataFormat={this.messageFormatter}
        >
          Message
        </TableHeaderColumn>
        <TableHeaderColumn
          className="updated-at"
          columnClassName="updated-at"
          dataField="createdAt"
          dataFormat={toLocaleDate}
          filterFormatted
          dataSort
        >
          Updated
        </TableHeaderColumn>
        <TableHeaderColumn
          className="created-by"
          columnClassName="created-by"
          dataField="createdBy"
          dataFormat={val => val.userName}
          filterFormatted
          dataSort
        >
          Updated By
        </TableHeaderColumn>
        <TableHeaderColumn
          className="action"
          columnClassName="action"
          dataField="action"
          dataFormat={this.buttonFormatter}
          expandable={false}
        >
          Actions
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    diaries: getDiariesForTable(state)
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDiaryAction: toggleDiary
  }
)(DiaryTable);

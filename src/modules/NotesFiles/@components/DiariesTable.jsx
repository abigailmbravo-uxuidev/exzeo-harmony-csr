import React from 'react';
import PropTypes from 'prop-types';
import { date, Button, BootstrapTable, ToolkitProvider } from '@exzeo/core-ui';
import { Search } from 'react-bootstrap-table2-toolkit';

import * as notesUtils from '../utilities';
import { DIARY_STATUS_COLOR, DIARY_STATUS } from '../constants';

const DiariesTable = ({
  data: diaries = [],
  toggleDiary,
  document,
  sourceNumbers,
  documentType
}) => {
  const { SearchBar } = Search;

  const DiaryExpandColumns = ({ diaries }) => {
    const columns = [
      {
        headerClasses: 'due',
        classes: 'due',
        dataField: 'due',
        text: 'Due'
      },
      {
        headerClasses: 'assignee',
        classes: 'assignee',
        dataField: 'assignee.displayName',
        text: 'Assignee'
      },
      {
        headerClasses: 'reason',
        classes: 'reason',
        dataField: 'reasonLabel',
        text: 'Reason'
      },
      {
        headerClasses: 'message',
        classes: 'message',
        dataField: 'message',
        text: 'Message'
      },
      {
        headerClasses: 'updated-at',
        classes: 'updated-at',
        dataField: 'updatedAt',
        text: 'Updated',
        formatter: val => date.formatDate(val)
      },
      {
        headerClasses: 'created-by',
        classes: 'created-by',
        dataField: 'createdBy.userName',
        text: 'Updated By'
      }
    ];

    return (
      <BootstrapTable
        wrapperClass="sub-table"
        tableHeaderClass="diaries compact-table"
        keyField="_id"
        data={diaries}
        columns={columns}
        bordered={false}
        hover
      />
    );
  };

  const openDiaryModal = diaryAction => {
    const { ...selectedDiary } = diaryAction;
    toggleDiary({
      resourceType: documentType,
      resourceId: sourceNumbers,
      selectedDiary,
      entity: document
    });
  };

  const makeDiaryButton = diaryAction => {
    return diaryAction.open ? (
      <Button
        dataTest="open-diaries-modal"
        className={Button.constants.classNames.link}
        customClass="btn-grid-row"
        onClick={() => openDiaryModal(diaryAction)}
      >
        <i className="fa fa-chevron-circle-up" />
      </Button>
    ) : null;
  };

  const makeExpandButton = (isExpandable, expanded) => {
    if (!isExpandable) return null;
    return expanded ? (
      <span>
        <i className="fa fa-caret-square-o-up" role="button" />
      </span>
    ) : (
      <span>
        <i className="fa fa-caret-square-o-down" role="button" />
      </span>
    );
  };

  const expandRow = {
    renderer: diary => {
      const { diaryHistory } = diary;
      if (diaryHistory.length === 0) {
        return null;
      } else {
        return <DiaryExpandColumns diaries={diaryHistory} />;
      }
    },
    showExpandColumn: true,
    expandColumnPosition: 'right',
    expandByColumnOnly: true,
    nonExpandable: diaries
      .filter(d => d.diaryHistory.length === 0)
      .map(d => d.rowKey),
    expandHeaderColumnRenderer: () => 'Actions',
    expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
      const diary = diaries.find(diary => diary.rowKey === rowKey);
      const { action: diaryAction } = diary;
      return (
        <>
          {makeDiaryButton(diaryAction)}
          {makeExpandButton(expandable, expanded)}
        </>
      );
    }
  };

  const statusFormatter = status => {
    return (
      <div className="status-indicator">
        <span className={DIARY_STATUS_COLOR[status]} />
        <span className="status-display">{DIARY_STATUS[status]}</span>
      </div>
    );
  };

  const columns = [
    {
      headerClasses: 'due-status',
      classes: 'due-status',
      dataField: 'dueStatus',
      text: 'Status',
      formatter: statusFormatter,
      sort: true,
      sortFunc: (a, b, order, dataField, rowA, rowB) =>
        notesUtils.sortByDate(rowA.due, rowB.due, order)
    },
    {
      headerClasses: 'due',
      classes: 'due',
      dataField: 'due',
      text: 'Due',
      formatter: (val, row) => row.dueDateDisplay,
      sort: true,
      sortFunc: (a, b, order) => notesUtils.sortByDate(a, b, order)
    },
    {
      headerClasses: 'assignee',
      classes: 'assignee',
      dataField: 'assignee.displayName',
      text: 'Assignee',
      sort: true
    },
    {
      headerClasses: 'reason',
      classes: 'reason',
      dataField: 'reasonLabel',
      text: 'Reason',
      sort: true
    },
    {
      headerClasses: 'message',
      classes: 'message',
      dataField: 'message',
      text: 'Message',
      sort: true,
      sortFunc: notesUtils.sortCaseInsensitive
    },
    {
      headerClasses: 'updated-at',
      classes: 'updated-at',
      dataField: 'updatedAt',
      text: 'Updated',
      formatter: val => date.formatDate(val),
      sort: true,
      sortFunc: notesUtils.sortByDate
    },
    {
      headerClasses: 'created-by',
      classes: 'created-by',
      dataField: 'createdBy.userName',
      text: 'Updated By',
      sort: true
    }
  ];

  return (
    <ToolkitProvider keyField="rowKey" data={diaries} columns={columns} search>
      {props => (
        <div className="diaries">
          <div className={'search'}>
            <span>Search Table Data</span>
            <SearchBar {...props.searchProps} />
          </div>
          <BootstrapTable
            {...props.baseProps}
            noDataIndication="There is no data to display"
            wrapperClass="diaries compact-table"
            expandRow={expandRow}
            bordered={false}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

DiariesTable.propTypes = {
  data: PropTypes.array.isRequired,
  toggleDiary: PropTypes.func.isRequired,
  document: PropTypes.object
};

export default DiariesTable;

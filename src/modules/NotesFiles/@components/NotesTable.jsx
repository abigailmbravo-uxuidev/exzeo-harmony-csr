import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, ToolkitProvider } from '@exzeo/core-ui';
import { Search } from 'react-bootstrap-table2-toolkit';
import * as notesUtils from '../utilities';
import Downloader from './Downloader';

const NotesTable = ({ data: notes = [], errorHandler }) => {
  const { SearchBar } = Search;

  const attachmentUrl = attachments => (
    <span>
      {attachments.map((attachment, i) => {
        return (
          <Downloader
            key={i}
            fileName={attachment.fileName}
            fileUrl={attachment.fileUrl}
            errorHandler={err => errorHandler(err)}
          />
        );
      })}
    </span>
  );

  const formatNote = note => {
    if (!note) {
      return '';
    }
    const noteFormatted = note.replace(/[\r\n]/g, '<br>');
    return <div dangerouslySetInnerHTML={{ __html: noteFormatted }} />;
  };

  const columns = [
    {
      headerClasses: 'created-date',
      classes: 'created-date',
      dataField: 'createdAt',
      text: 'Created',
      formatter: notesUtils.formatCreatedDate,
      sort: true,
      sortFunc: notesUtils.sortByDate
    },
    {
      headerClasses: 'term',
      classes: 'term',
      dataField: 'term',
      text: 'Term',
      sort: true,
      align: 'center'
    },
    {
      headerClasses: 'created-by',
      classes: 'created-by',
      text: 'Author',
      dataField: 'createdBy.userName',
      sort: true,
      sortFunc: notesUtils.sortCaseInsensitive
    },
    {
      headerClasses: 'note-type',
      classes: 'note-type',
      dataField: 'noteContactType',
      text: 'Contact',
      sort: true
    },
    {
      headerClasses: 'note',
      classes: 'note',
      dataField: 'noteContent',
      text: 'Note',
      sort: true,
      sortFunc: notesUtils.sortNoteContent,
      formatter: formatNote
    },
    {
      headerClasses: 'file-type',
      classes: 'file-type',
      dataField: 'fileType',
      text: 'File Type',
      sort: true
    },
    {
      headerClasses: 'attachments',
      classes: 'attachments',
      dataField: 'noteAttachments',
      text: 'File',
      formatter: attachmentUrl,
      sort: true,
      sortFunc: notesUtils.sortFiles
    }
  ];
  return (
    <ToolkitProvider keyField="_id" data={notes} columns={columns} search>
      {props => (
        <>
          <div className="search">
            <span>Search Table Data</span>
            <SearchBar {...props.searchProps} />
          </div>
          <BootstrapTable
            {...props.baseProps}
            noDataIndication="There is no data to display"
            wrapperClass="notes compact-table"
            striped
            hover
            bordered={false}
          />
        </>
      )}
    </ToolkitProvider>
  );
};

NotesTable.propTypes = {
  data: PropTypes.array.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default NotesTable;

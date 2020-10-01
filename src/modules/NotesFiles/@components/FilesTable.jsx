import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, ToolkitProvider } from '@exzeo/core-ui';
import { Search } from 'react-bootstrap-table2-toolkit';
import * as notesUtils from '../utilities';
import Downloader from './Downloader';

const FilesTable = ({ data: files = [], sourceType = '', errorHandler }) => {
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
            showFileName
          />
        );
      })}
    </span>
  );

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
      align: 'center',
      hidden: sourceType !== 'policyNumber'
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
    <ToolkitProvider keyField="_id" data={files} columns={columns} search>
      {props => (
        <>
          <div className="search">
            <span>Search Table Data</span>
            <SearchBar {...props.searchProps} />
          </div>
          <BootstrapTable
            {...props.baseProps}
            noDataIndication="There is no data to display"
            wrapperClass="files compact-table"
            striped
            hover
            bordered={false}
          />
        </>
      )}
    </ToolkitProvider>
  );
};

FilesTable.propTypes = {
  data: PropTypes.array.isRequired,
  sourceType: PropTypes.string,
  errorHandler: PropTypes.func.isRequired
};

export default FilesTable;

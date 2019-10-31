import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as notesUtils from '../utilities';
import Downloader from './Downloader';
import { SearchPanel } from './SearchPanel';

const Notes = props => {
  const {
    notes,
    attachmentStatus,
    customHandlers: { setAppError }
  } = props;
  const options = {
    searchPanel: props => <SearchPanel searchField={props.searchField} />
  };

  const attachmentUrl = attachments => (
    <span>
      {attachments.map((attachment, i) => {
        const fileName = notesUtils.getFileName(attachment);
        return (
          <Downloader
            key={i}
            fileName={fileName}
            fileUrl={attachment.fileUrl}
            errorHandler={err => setAppError(err)}
          />
        );
      })}
    </span>
  );

  return (
    <BootstrapTable
      className={
        attachmentStatus ? 'files compact-table' : 'notes compact-table'
      }
      data={notesUtils.filterNotesByType(notes, attachmentStatus)}
      options={options}
      search
      multiColumnSearch
    >
      <TableHeaderColumn dataField="_id" isKey hidden>
        ID
      </TableHeaderColumn>
      <TableHeaderColumn
        className="created-date"
        columnClassName="created-date"
        dataField="createdAt"
        dataSort
        dataFormat={notesUtils.formatCreatedDate}
        filterFormatted
      >
        Created
      </TableHeaderColumn>
      <TableHeaderColumn
        className="term"
        columnClassName="term"
        dataField="term"
        sortOrder="desc"
        sortFunc={notesUtils.sortNumber}
        dataSort
      >
        Term
      </TableHeaderColumn>
      <TableHeaderColumn
        className="created-by"
        columnClassName="created-by"
        dataField="createdBy"
        dataSort
        dataFormat={notesUtils.showCreatedBy}
        sortFunc={notesUtils.sortAuthor}
      >
        Author
      </TableHeaderColumn>
      <TableHeaderColumn
        className="note-type"
        columnClassName="note-type"
        dataField="noteContactType"
        dataSort
        hidden={attachmentStatus}
      >
        Contact
      </TableHeaderColumn>
      <TableHeaderColumn
        className="note"
        columnClassName="note"
        dataField="noteContent"
        dataSort
        dataFormat={notesUtils.formatNote}
        hidden={attachmentStatus}
      >
        Note
      </TableHeaderColumn>
      <TableHeaderColumn
        className="count"
        columnClassName="count"
        dataField="noteAttachments"
        dataFormat={notesUtils.attachmentCount}
        hidden
      />
      <TableHeaderColumn
        className="file-type"
        columnClassName="file-type"
        dataField="noteAttachments"
        dataSort
        dataFormat={notesUtils.attachmentType}
      >
        File Type
      </TableHeaderColumn>
      <TableHeaderColumn
        className="attachments"
        columnClassName="attachments"
        dataField="noteAttachments"
        dataSort
        dataFormat={attachmentUrl}
        filterValue={notesUtils.attachmentFilter}
        sortFunc={notesUtils.sortFiles}
      >
        File
      </TableHeaderColumn>
    </BootstrapTable>
  );
};

export default Notes;

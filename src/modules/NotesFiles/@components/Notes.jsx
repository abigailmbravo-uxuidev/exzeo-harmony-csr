import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as notesUtils from '../utilities';
import Downloader from './Downloader';
import { SearchPanel } from './SearchPanel';

const Notes = props => {
  const {
    notes,
    showAttachments,
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
        showAttachments ? 'files compact-table' : 'notes compact-table'
      }
      data={notesUtils.filterNotesByType(notes, showAttachments)}
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
        sortFunc={(a, b, order) =>
          notesUtils.sortByDate(a.createdAt, b.createdAt, order)
        }
      >
        Created
      </TableHeaderColumn>
      <TableHeaderColumn
        className="term"
        columnClassName="term"
        dataField="term"
        sortOrder="desc"
        dataAlign="center"
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
        sortFunc={notesUtils.sortContactType}
        hidden={showAttachments}
      >
        Contact
      </TableHeaderColumn>
      <TableHeaderColumn
        className="note"
        columnClassName="note"
        dataField="noteContent"
        dataSort
        sortFunc={notesUtils.sortNoteContent}
        dataFormat={notesUtils.formatNote}
        hidden={showAttachments}
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
        dataField="fileType"
        dataSort
        sortOrder="asc"
        sortFunc={notesUtils.sortFileType}
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

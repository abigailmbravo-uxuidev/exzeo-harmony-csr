import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Downloader from './Downloader';
import { SearchPanel } from './SearchPanel';
import { date } from '@exzeo/core-ui/src';

export const filterNotesByType = (notes, type) => {
  if (!Array.isArray(notes)) return [];
  return type ? notes.filter(n => n.attachments.length > 0) : notes.filter(n => n.content);
};

const Notes = (props) => {
  const { notes, attachmentStatus } = props;

  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => (createdBy ? createdBy.userName : '');
  const attachmentCount = attachments => (attachments ? attachments.length : 0);
  const attachmentType = attachments => (attachments.length > 0 ? attachments[0].fileType : '');
  const formatCreatedDate = createdDate => date.formattedLocalDate(createdDate);
  const formatNote = note => (note ? note.replace(/\r|\n/g, '<br>') : '');
  const attachmentFilter = cell => (cell.length > 0 ? cell[0].fileName : null);
  const sortAuthor = (a, b, order) => {
    if (!a.createdBy) return order === 'desc' ? -1 : 1;
    if (!b.createdBy) return order === 'desc' ? 1 : -1;
    return order === 'desc'
      ? a.createdBy.userName > b.createdBy.userName ? 1 : -1
      : a.createdBy.userName < b.createdBy.userName ? 1 : -1;
  };

  const sortFiles = (a, b, order) => {
    const fileA = (a.attachments.length > 0) ? a.attachments[0].fileName : '';
    const fileB = (b.attachments.length > 0) ? b.attachments[0].fileName : '';

    return order === 'desc'
      ? fileA > fileB ? 1 : -1
      : fileA < fileB ? 1 : -1;
  };

  const attachmentUrl = attachments => (
    <span>
      {attachments.map((attachment, i) =>
        (<Downloader
          fileName={attachment.fileName}
          fileUrl={attachment.fileUrl}
          errorHandler={err => props.actions.errorActions.setAppError(err)}
          key={i} />))}
    </span>
  );

  return (
    <BootstrapTable
      className={attachmentStatus ? 'files compact-table' : 'notes compact-table'}
      data={filterNotesByType(notes, attachmentStatus)}
      options={options}
      search
      multiColumnSearch>
      <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataSort dataFormat={formatCreatedDate} filterFormatted >Created</TableHeaderColumn>
      <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} sortFunc={sortAuthor}>Author</TableHeaderColumn>
      <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort hidden={attachmentStatus} >Contact</TableHeaderColumn>
      <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} hidden={attachmentStatus} >Note</TableHeaderColumn>
      <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
      <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="attachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
      <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataSort dataFormat={attachmentUrl} filterValue={attachmentFilter} sortFunc={sortFiles}>File</TableHeaderColumn>
    </BootstrapTable>
  );
};

export default Notes;

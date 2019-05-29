import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Downloader from './Downloader';
import { SearchPanel } from './SearchPanel';
import { date } from '@exzeo/core-ui/src';

export const filterNotesByType = (notes, type) => {
  if (!Array.isArray(notes)) return [];
  return type ? notes.filter(n => n.noteAttachments.length > 0) : notes.filter(n => n.noteContent);
};

const toTitleCase = str =>
    str.toLowerCase().split(' ').map(s => s.replace(s[0], s[0].toUpperCase())).join(' ');
  
  const getFileName = a => a.fileName ? a.fileName : a.fileUrl.substring(a.fileUrl.lastIndexOf("/") + 1);

  const showCreatedBy = createdBy => (createdBy ? createdBy.userName : '');
  const attachmentCount = attachments => (attachments ? attachments.length : 0);
  const attachmentType = attachments => (attachments.length > 0 ? toTitleCase(attachments[0].fileType) : '');
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
    const fileA = (a.noteAttachments.length > 0) ? getFileName(a.noteAttachments[0]) : '';
    const fileB = (b.noteAttachments.length > 0) ? getFileName(b.noteAttachments[0]) : '';

    return order === 'desc'
      ? fileA > fileB ? 1 : -1
      : fileA < fileB ? 1 : -1;
  };


const Notes = (props) => {
  const { notes, attachmentStatus, customHandlers: { setAppError } } = props;
  const options = { searchPanel: props => (<SearchPanel {...props} />) };

  const attachmentUrl = attachments => (
    <span>
      {attachments.map((attachment, i) => {
        const fileName = getFileName(attachment);
        return (
            <Downloader
            fileName={fileName}
            fileUrl={attachment.fileUrl}
            errorHandler={err => props.setAppError(err)}
            key={i} />
        );
      })}
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
      <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdAt" dataSort dataFormat={formatCreatedDate} filterFormatted >Created</TableHeaderColumn>
      <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} sortFunc={sortAuthor}>Author</TableHeaderColumn>
      <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="noteContactType" dataSort hidden={attachmentStatus} >Contact</TableHeaderColumn>
      <TableHeaderColumn className="note" columnClassName="note" dataField="noteContent" dataSort dataFormat={formatNote} hidden={attachmentStatus} >Note</TableHeaderColumn>
      <TableHeaderColumn className="count" columnClassName="count" dataField="noteAttachments" dataFormat={attachmentCount} hidden />
      <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="noteAttachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
      <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="noteAttachments" dataSort dataFormat={attachmentUrl} filterValue={attachmentFilter} sortFunc={sortFiles}>File</TableHeaderColumn>
    </BootstrapTable>
  );
};

export default Notes;

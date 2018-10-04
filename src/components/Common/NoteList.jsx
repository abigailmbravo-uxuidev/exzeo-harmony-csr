import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Downloader from './Downloader';

export const SearchPanel = (props) => (
  <div className="search">
    <label>Search Table Data</label>
    { props.searchField }
  </div>
);

export const filterNotesByType = (notes, type) => {
  if (!Array.isArray(notes)) return [];
  return type ? notes.filter(n => n.attachments.length > 0) : notes.filter(n => n.content);
};

export const Notes = (props) => {
  const { notes, attachmentStatus, setNoteStatus } = props;

  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => createdBy ? createdBy.userName : '';
  const attachmentCount = attachments => attachments ? attachments.length : 0;
  const attachmentType = attachments => attachments.length > 0 ? attachments[0].fileType : '';
  const formatCreatedDate = createdDate => `${moment.tz(moment.utc(createdDate), 'America/New_York').format('MM/DD/YYYY h:mm A')} EST`;
  const formatNote = note => note ? note.replace(/\r|\n/g, '<br>') : '';
  const attachmentFilter = cell => cell.length > 0 ? cell[0].fileName : null;
  const sortAuthor = (a, b, order) => {
    if (!a.createdBy) return order === 'desc' ? -1 : 1;
    if (!b.createdBy) return order === 'desc' ? 1 : -1;
    return order === 'desc' 
      ? a.createdBy.userName > b.createdBy.userName ? 1 : -1
      : a.createdBy.userName < b.createdBy.userName ? 1 : -1;
    }
  
  const sortFiles = (a, b, order) => {
    const fileA = (a.attachments.length > 0) ? a.attachments[0].fileName : '';
    const fileB = (b.attachments.length > 0) ? b.attachments[0].fileName : '';
    
    return order === 'desc'
      ? fileA > fileB ? 1 : -1
      : fileA < fileB ? 1 : -1;
  }
  //const sortFiles = (a, b, order) => order === 'desc' 
  //  ? a.attachments[0].fileName > b.attachments[0].fileName ? 1 : -1
  //  : a.attachments[0].fileName < b.attachments[0].fileName ? 1 : -1;

  const attachmentUrl = attachments => (
    <span>
      { attachments.map((attachment, i) =>
        <Downloader
          fileName={attachment.fileName}
          fileUrl={attachment.fileUrl}
          errorHandler={(err) => props.actions.errorActions.setAppError(err)}
          key={i}
        />
      )}
    </span>
  );

  return (
    <div className="note-grid-wrapper btn-tabs">
      <div className="filter-tabs">
        <button type="button" className={`btn btn-tab ${!attachmentStatus ? 'selected' : ''}`} onClick={() => setNoteStatus(false)}>Notes</button>
        <button type="button" className={`btn btn-tab ${attachmentStatus ? 'selected' : ''}`} onClick={() => setNoteStatus(true)}>Files</button>
      </div>
      <BootstrapTable
        className={attachmentStatus ? 'files compact-table' : 'notes compact-table'}
        data={filterNotesByType(notes, attachmentStatus)}
        options={options}
        search
        multiColumnSearch
      >
        <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataSort dataFormat={formatCreatedDate} filterFormatted >Created</TableHeaderColumn>
        <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} sortFunc={sortAuthor}>Author</TableHeaderColumn>
        <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort hidden={attachmentStatus} >Contact</TableHeaderColumn>
        <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} hidden={attachmentStatus} >Note</TableHeaderColumn>
        <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
        <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="attachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
        <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataSort dataFormat={attachmentUrl} filterValue={attachmentFilter} sortFunc={sortFiles}>File</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export class NoteList extends Component {
  state = { attachmentStatus: false };
  setNoteStatus = status => this.setState({ attachmentStatus: status });

  render () {
    return (
    <div>
      <form id="NotesFiles" onSubmit={() => null} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3>History</h3>
            <section>
              <div className="notes-list">
                <Notes {...this.props} attachmentStatus={this.state.attachmentStatus} setNoteStatus={this.setNoteStatus} />
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array,
  actions: PropTypes.shape({
    errorActions: PropTypes.shape({
      setAppError: PropTypes.func.isRequired
    })
  })
};

export default NoteList;

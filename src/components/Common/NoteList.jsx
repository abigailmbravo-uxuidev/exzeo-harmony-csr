import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Downloader from './Downloader';

const SearchPanel = props => (
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
  const showCreatedBy = createdBy => createdBy ? `${createdBy.userName}` : '';
  const attachmentCount = attachments => attachments ? `${attachments.length}` : 0;
  const attachmentType = attachments => attachments.length > 0 ? attachments[0].fileType : '';
  const formatCreateDate = createDate => moment.utc(createDate).format('MM/DD/YYYY');
  const formatNote = note => note ? note.replace(/\r|\n/g, '<br>') : '';
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
    <div className="note-grid-wrapper">
      <div className="filter-tabs">
        <button type="button" className={`btn btn-sm ${!attachmentStatus ? 'btn-primary' : ''}`} onClick={() => setNoteStatus(false)}>Notes</button> 
        <button type="button" className={`btn btn-sm ${attachmentStatus ? 'btn-primary' : ''}`} onClick={() => setNoteStatus(true)}>Documents</button>
      </div>
      <BootstrapTable
        data={filterNotesByType(notes, attachmentStatus)}
        options={options}
        search
        multiColumnSearch
      >
        <TableHeaderColumn dataField="_id"isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataSort dataFormat={formatCreateDate} >Created</TableHeaderColumn>
        <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} >Author</TableHeaderColumn>
        {!attachmentStatus && <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort >Note Type</TableHeaderColumn>}
        {!attachmentStatus && <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} >Note</TableHeaderColumn>}
        <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
        <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="attachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
        <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataFormat={attachmentUrl} dataSort >Attachments</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export class NoteList extends Component {
  state = { attachmentStatus: false };
  setNoteStatus = (status) => this.setState({ attachmentStatus: status });

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
  notes: PropTypes.array
};

export default NoteList;

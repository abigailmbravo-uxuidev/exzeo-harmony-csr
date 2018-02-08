import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as serviceActions from '../../actions/serviceActions';
import PolicyBaseConnect from '../../containers/Policy';
import * as errorActions from '../../actions/errorActions';
import NoteList from '../Common/NoteList';
import Footer from '../Common/Footer';

const handleInitialize = state => ({
  attachmentStatus: false
});

const SearchPanel = props => (
  <div className="search">
    <label>Search Table Data</label>
    { props.searchField }
  </div>
  );

export const filterNotesByType = (notes, type) => {
  if (!Array.isArray(notes)) return [];
  if (type) {
    return notes.filter(n => n.attachments.length > 0);
  } else {
    return notes.filter(n => n.content);
  }
};

export const NoteList = (props) => {
  const { notes, fieldValues } = props;

  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => createdBy ? `${createdBy.userName}` : '';
  const attachmentCount = attachments => attachments ? `${attachments.length}` : 0;
  const attachmentType = attachments => attachments.length > 0 ? attachments[0].fileType : '';
  const formatCreatedDate = createdDate => moment.utc(createdDate).format('MM/DD/YYYY  h:m A');
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
    <div className="note-grid-wrapper btn-tabs">
      <div className="filter-tabs">
        <RadioField
          name={'attachmentStatus'} styleName={''} label={''} onChange={function () {}} segmented answers={[
            {
              answer: false,
              label: 'Notes'
            }, {
              answer: true,
              label: 'Documents'
            }
          ]}
        />
      </div>
      <BootstrapTable
        data={filterNotesByType(notes, fieldValues.attachmentStatus)}
        options={options}
        search
        multiColumnSearch
      >
        <TableHeaderColumn dataField="_id"isKey hidden>ID</TableHeaderColumn>
        <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataSort dataFormat={formatCreatedDate} >Created</TableHeaderColumn>
        <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} >Author</TableHeaderColumn>
        {!fieldValues.attachmentStatus && <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort >Note Type</TableHeaderColumn>}
        {!fieldValues.attachmentStatus && <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} >Note</TableHeaderColumn>}
        <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
        <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="attachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
        <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataFormat={attachmentUrl} dataSort >Documents</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

const handleFormSubmit = (data, dispatch, props) => alert('submit');

export class NotesFiles extends Component {

  componentDidMount () {
    const { actions, policy } = this.props;
    if (policy && policy.policyNumber) {
      const ids = [policy.policyNumber, policy.sourceNumber];
      actions.serviceActions.getNotes(ids.toString(), policy.policyNumber);
    }
  }

  render() {
    return (
      <PolicyBaseConnect>
        <div className="route-content">
          <div className="scroll">
            <NoteList {...this.props} />
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </PolicyBaseConnect>
    );
  }
}

NotesFiles.propTypes = {
  quoteData: PropTypes.shape()
};

const mapStateToProps = state => ({
  notes: state.service.notes,
  policy: state.service.latestPolicy || {},
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesFiles);

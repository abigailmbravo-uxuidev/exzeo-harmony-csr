import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import RadioField from '../Form/inputs/RadioField';
import Downloader from './Downloader';

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

export const Notes = (props) => {
  const { notes, fieldValues } = props;

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
  )

  return (
    <div className="note-grid-wrapper">
      <div className="filter-tabs">
        <RadioField
          name={'attachmentStatus'} styleName={''} label={''} onChange={ () => {} } segmented answers={[
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
        <TableHeaderColumn className="created-date" columnClassName="created-date" dataField="createdDate" dataSort dataFormat={formatCreateDate} >Created</TableHeaderColumn>
        <TableHeaderColumn className="created-by" columnClassName="created-by" dataField="createdBy" dataSort dataFormat={showCreatedBy} >Author</TableHeaderColumn>
        {!fieldValues.attachmentStatus && <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort >Note Type</TableHeaderColumn>}
        {!fieldValues.attachmentStatus && <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} >Note</TableHeaderColumn>}
        <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
        <TableHeaderColumn className="file-type" columnClassName="file-type" dataField="attachments" dataSort dataFormat={attachmentType} >File Type</TableHeaderColumn>
        <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataFormat={attachmentUrl} dataSort >Attachments</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export class NoteList extends Component {
  render() {
    return (
    <div>
      <Form id="NotesFiles" onSubmit={() => null} noValidate>
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h3>History</h3>
            <section>
              <div className="notes-list">
                <Notes {...this.props} />
              </div>
            </section>
          </div>
        </div>
      </Form>
    </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array
};

const mapStateToProps = state => ({
  fieldValues: state.form && state.form.NotesFiles ? state.form.NotesFiles.values : {},
  initialValues: handleInitialize(state),
  error: state.error
});

export default connect(mapStateToProps)(reduxForm({ form: 'NotesFiles', enableReinitialize: true })(NoteList));

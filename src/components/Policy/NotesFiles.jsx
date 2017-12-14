import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, Form, propTypes } from 'redux-form';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as errorActions from '../../actions/errorActions';
import PolicyBaseConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import RadioField from '../Form/inputs/RadioField';
import Downloader from '../Common/Downloader';
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
  if (type) return notes.filter(n => n.attachments.length > 0);
  return notes;
};

export const NoteList = (props) => {
  const { notes, fieldValues } = props;

  const options = { searchPanel: props => (<SearchPanel {...props} />) };
  const showCreatedBy = createdBy => createdBy ? `${createdBy.userName}` : '';
  const attachmentCount = attachments => attachments ? `${attachments.length}` : 0;
  const formatCreateDate = createDate => moment.utc(createDate).format('MM/DD/YYYY');
  const formatNote = note => note.replace(/\r|\n/g, '<br>');
  const attachmentUrl = attachments => (
    <span>
      { attachments.map((attachment, i) =>
        <Downloader
          fileName={attachment.fileName}
          fileUrl={attachment.fileUrl}
          fileType={attachment.fileType}
          errorHandler={(err) => props.actions.errorActions.setAppError(err)}
          key={i}
        />
      )}
    </span>
  );

  return (
    <div className="note-grid-wrapper">
      <div className="filter-tabs">
        <RadioField
          name={'attachmentStatus'} styleName={''} label={''} onChange={function () {}} segmented answers={[
            {
              answer: false,
              label: 'All Notes'
            }, {
              answer: true,
              label: 'Attachments'
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
        <TableHeaderColumn className="note-type" columnClassName="note-type" dataField="contactType" dataSort >Note Type</TableHeaderColumn>
        <TableHeaderColumn className="note" columnClassName="note" dataField="content" dataSort dataFormat={formatNote} >Note</TableHeaderColumn>
        <TableHeaderColumn className="count" columnClassName="count" dataField="attachments" dataFormat={attachmentCount} hidden />
        <TableHeaderColumn className="attachments" columnClassName="attachments" dataField="attachments" dataFormat={attachmentUrl} dataSort >Attachments</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

const handleFormSubmit = (data, dispatch, props) => alert('submit');

export class NotesFiles extends Component {

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy && nextProps.policy.policyNumber) {
        const ids = [nextProps.policy.policyNumber, nextProps.policy.sourceNumber];
        this.props.actions.serviceActions.getNotes(ids.toString());
      }
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <PolicyBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <div className="scroll">
            <Form id="NotesFiles" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  <h3>History</h3>
                  <section>
                    <div className="notes-list">
                      <NoteList {...this.props} />
                    </div>
                  </section>
                </div>
              </div>
            </Form>
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
  ...propTypes,
  policy: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'NotesFiles.values', {}),
  initialValues: handleInitialize(state),
  notes: state.service.notes,
  policy: state.service.latestPolicy || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'NotesFiles', enableReinitialize: true })(NotesFiles));

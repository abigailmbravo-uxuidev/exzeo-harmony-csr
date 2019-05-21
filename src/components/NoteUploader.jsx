import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import XHRUpload from '@uppy/xhr-upload';
import { Draggable, Select, validation, Loader } from '@exzeo/core-ui';
import { callService } from '@exzeo/core-ui/src/@Harmony';

import {
  toggleNote,
  toggleDiary,
  setNotesSynced
} from '../state/actions/ui.actions';
import { fetchNotes } from '../state/actions/notes.actions';
import { setAppError } from '../state/actions/error.actions';

import '@uppy/core/dist/style.min.css';

export const renderNotes = ({ input, label, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export const validate = values => {
  const errors = {};
  if (!values.noteContent) errors.noteContent = 'Note Content Required';
  return errors;
};

// TODO: Pull this from the list service
const contactTypeOptions = {
  Agency: [
    'Change name/FEIN',
    'Change Agent',
    'Change Other',
    'Concern',
    'Correspondence',
    'Other'
  ],
  Agent: ['Change', 'Concern', 'Correspondence', 'Other'],
  Quote: ['Agent', 'Policyholder', 'Inspector', 'Other'],
  Policy: [
    'Agent',
    'Policyholder',
    'Lienholder',
    'Internal',
    'Inspector',
    'Other'
  ]
};

const docTypeOptions = {
  Agency: [
    'Addendum',
    'Agreement',
    'Application',
    'Book of Business',
    'Correspondence',
    'Department of Insurance',
    'Errors and Omissions',
    'Finance',
    'License',
    'Miscellaneous',
    'Update Request',
    'W9',
    'W9 EIN'
  ],
  Agent: [],
  Quote: [
    '4-pt Inspection',
    'Claims Documentation',
    'Correspondence',
    'Elevation Certificate',
    'Flood Selection Form',
    'Flood Waiver Form',
    'HUD Statement',
    'New Business Application',
    'Other',
    'Proof Of Prior Insurance',
    'Proof Of Repair',
    'Property Inspection',
    'Protection Device Certificate',
    'Quote Summary',
    'Reinstatement Correspondence',
    'Replacement Cost Estimator',
    'Roof Inspection/permit',
    'Sinkhole Loss Questionnaire',
    'Sinkhole Selection/rejection Form',
    'Wind Exclusion',
    'Wind Mitigation'
  ],
  Policy: [
    '4-pt Inspection',
    'AI Change',
    'AOR Change',
    'Cancellation Request',
    'Cancellation/non-renewal Notice',
    'Claims Documentation',
    'Correspondence',
    'Electronic Payment Receipt',
    'Elevation Certificate',
    'Endorsement',
    'Financial Document',
    'Policy Packet',
    'Flood Selection Form',
    'Flood Waiver Form',
    'HUD Statement',
    'New Business Application',
    'Occupancy Letter',
    'Other',
    'Proof Of Prior Insurance',
    'Proof Of Repair',
    'Property Inspection',
    'Protection Device Certificate',
    'Reinstatement Correspondence',
    'Reinstatement Notice',
    'Replacement Cost Estimator',
    'Returned Mail',
    'Roof Inspection/permit',
    'Sinkhole Loss Questionnaire',
    'Sinkhole Selection/rejection Form',
    'Statement Of No Loss',
    'UW Condition Letter',
    'Wind Exclusion',
    'Wind Mitigation'
  ]
};

export class NoteUploader extends Component {
  constructor(props) {
    super(props);

    const idToken = localStorage.getItem('id_token');

    this.uppy = new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: process.env.REACT_APP_REQUEST_SIZE.slice(0, -2) * 1000000
      },
      meta: { documentId: this.props.documentId },
      onBeforeFileAdded: this.validateFile,
      onBeforeUpload: this.validateUpload
    }).use(XHRUpload, {
      endpoint: `${process.env.REACT_APP_API_URL}/upload`,
      fieldName: 'files[]',
      headers: {
        accept: 'application/json',
        authorization: `bearer ${idToken}`
      }
    });
  }

  state = {
    minimize: false,
    fileExtensions: {}
  };

  componentDidMount() {
    const { initialize, resourceType } = this.props;

    this.contactTypes = resourceType ? contactTypeOptions[resourceType] : [];
    this.docTypes = resourceType ? docTypeOptions[resourceType] : [];

    const defaultValues = {
      Agency: 0,
      Quote: 8,
      Policy: 17
    };

    initialize({
      contactType: this.contactTypes[0],
      fileType: this.docTypes[defaultValues[resourceType]]
    });
  }

  handleMinimize = () =>
    this.setState(state => ({
      minimize: !state.minimize
    }));

  handleClose = () => this.props.toggleNote({});

  validateFile = file => {
    if (file.data.size === 0) {
      this.uppy.info('The file is empty.');
      return false;
    }

    if (!file.data.name.includes('.')) {
      this.uppy.info('Uploads must have a file extension.');
      return false;
    }
  };

  validateUpload = files => {
    if (Object.keys(files).some(id => !files[id].meta.name.includes('.'))) {
      this.uppy.info('The file name must have a file extension.');
      return false;
    }
  };

  submitNote = async (data, dispatch, props) => {
    const {
      companyCode,
      state,
      product,
      user,
      noteType,
      documentId,
      sourceId,
      resourceType,
      fetchNotes,
      toggleDiary,
      setNotesSynced
    } = props;

    const mapResourceToNumber = {
      Policy: 'policyNumber',
      Quote: 'quoteNumber',
      Agency: 'agencyCode',
      Agent: 'agentCode'
    };

    const filelist = Object.values(this.uppy.getState().files);
    const uploads = filelist.filter(file => file.progress.uploadComplete);

    if (filelist.length > uploads.length) {
      this.uppy.info('You have files that are not uploaded.', 'error');
      return false;
    }

    const noteAttachments = uploads.map(file => ({
      ...file.response.body,
      fileType: data.fileType
    }));
    const noteData = {
      companyCode,
      state,
      product,
      number: documentId,
      numberType: mapResourceToNumber[resourceType],
      source: sourceId,
      noteType,
      noteContent: data.noteContent,
      contactType: data.contactType,
      createdAt: moment().unix(),
      noteAttachments,
      createdBy: {
        userId: user.userId,
        userName: `${user.profile.given_name} ${user.profile.family_name}`
      }
    };

    const noteConfig = {
      exchangeName: 'harmony',
      routingKey: 'harmony.note.addNote',
      data: noteData
    };

    const { openDiary } = data;
    try {
      await callService(noteConfig, 'addNote');

      if (window.location.pathname.includes('/notes')) {
        const numberType = mapResourceToNumber[resourceType];
        const numbers =
          numberType === 'policyNumber'
            ? [noteData.number, noteData.source]
            : [noteData.number];
        // Update notes for Policy components (will be removed once Gandalf is added to Policy.
        fetchNotes(numbers, numberType);
        // Let Notes/Files page know to fetch list of notes
        setNotesSynced();
      }

      if (openDiary) {
        toggleDiary({
          companyCode,
          state,
          product,
          resourceType,
          resourceId: documentId
        });
      }
    } catch (err) {
      setAppError({ message: err });
    } finally {
      this.handleClose();
    }
  };

  render() {
    const { handleSubmit, noteType, submitting } = this.props;

    const contactTypeAnswers = this.contactTypes
      ? this.contactTypes.map(c => ({ answer: c, label: c }))
      : [];

    const docTypeAnswers = this.docTypes
      ? this.docTypes.map(d => ({ answer: d, label: d }))
      : [];

    return (
      <Draggable handle=".title-bar">
        <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file'} >
          <div className="title-bar">
            <div className="title title-minimze-button">Note / File</div>
            <div className="controls note-file-header-button-group">
              <button className="btn btn-icon minimize-button" onClick={this.handleMinimize}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
              <button className="btn btn-icon header-cancel-button" onClick={this.handleClose} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
            </div>
          </div>
          <div className="mainContainer">
            {submitting && <Loader />}
            <Form id="NoteUploader" onSubmit={handleSubmit(this.submitNote)} noValidate>
              <div className="content">
                <div className="note-details">
                  <div className="form-group contact">
                    <Field
                      name="contactType"
                      label="Contact"
                      component={Select}
                      answers={contactTypeAnswers}
                      validate={validation.isRequired}
                      dataTest="contactType"
                    />
                  </div>
                  {noteType !== 'Agency Note' &&
                  <div className="form-group diary-checkbox">
                    <Field component="input" name="openDiary" type="checkbox" />
                    <label>Create & Open Diary On Save</label>
                  </div>}
                </div>
                <Field name="noteContent" component={renderNotes} label="Note Content" />
                <Field
                  name="fileType"
                  label="File Type"
                  styleName="file-type"
                  component={Select}
                  answers={docTypeAnswers}
                  validate={validation.isRequired}
                  dataTest="fileType"
                />
                <Dashboard
                  uppy={this.uppy}
                  maxHeight={350}
                  proudlyDisplayPoweredByUppy={false}
                  metaFields={[{ id: 'name', name: 'Name', placeholder: 'file name' }]}
                  showProgressDetails
                  hideProgressAfterFinish />
              </div>
              <div className="buttons note-file-footer-button-group">
                <button tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.handleClose}>Cancel</button>
                <button tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
              </div>
            </Form>
          </div>
        </div>
      </Draggable>
    );
  }
}

NoteUploader.propTypes = {
  documentId: PropTypes.string.isRequired,
  noteType: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  resourceType: PropTypes.string,
  minimizeNote: PropTypes.bool
};

const mapStateToProps = state => ({
  notes: state.notes,
  user: state.authState.userProfile
});

export default connect(
  mapStateToProps,
  {
    fetchNotes,
    toggleNote,
    toggleDiary,
    setAppError,
    setNotesSynced
  }
)(
  reduxForm({
    form: 'NoteUploader',
    validate
  })(NoteUploader)
);

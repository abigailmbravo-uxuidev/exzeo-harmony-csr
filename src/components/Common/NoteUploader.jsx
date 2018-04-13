import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import localStorage from 'localStorage';
import { Field, Form, reduxForm, propTypes } from 'redux-form';
import Uppy from 'uppy/lib/core';
import { Dashboard } from 'uppy/lib/react';
import XHRUpload from 'uppy/lib/plugins/XHRUpload';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
import * as serviceActions from '../../actions/serviceActions';
import * as appStateActions from '../../actions/appStateActions';
import * as newNoteActions from '../../actions/newNoteActions';
import * as errorActions from '../../actions/errorActions';

export const minimzeButtonHandler = (props) => {
  if (props.appState.data.minimize) {
    props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, minimize: false });
  } else {
    props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, minimize: true });
  }
};

export const renderNotes = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    { touched && error && <span className="error-message">{ error }</span> }
  </div>
);

export const validate = (values) => {
  const errors = {};
  if (!values.noteContent) errors.noteContent = 'Note Content Required';
  return errors;
};

export const validateFile = (file => {
  return true;
});

export class Uploader extends Component {
  // TODO: Pull this from the list service
  contactTypeOptions = {
    'Quote Note': ['Agent', 'Policyholder', 'Inspector', 'Other'],
    'Policy Note': ['Agent', 'Policyholder', 'Lienholder', 'Internal', 'Inspector', 'Other']
  };

  docTypeOptions = {
    'Quote Note': [
      '4-pt Inspection',
      'Claims Documentation',
      'Consent To Rate Form',
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
      'Replacement Cost Estimator',
      'Roof Inspection/permit',
      'Sinkhole Loss Questionnaire',
      'Sinkhole Selection/rejection Form',
      'Wind Exclusion',
      'Wind Mitigation'
    ],
    'Policy Note': [
      '4-pt Inspection',
      'AI Change',
      'AOR Change',
      'Cancellation Request',
      'Cancellation/non-renewal Notice',
      'Claims Documentation',
      'Consent To Rate Form',
      'Correspondence',
      'DEC Page',
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
      'Reinstatement Notice',
      'Renewal Application',
      'Replacement Cost Estimator',
      'Returned Mail',
      'Returned Renewal Application',
      'Roof Inspection/permit',
      'Sinkhole Loss Questionnaire',
      'Sinkhole Selection/rejection Form',
      'Statement Of No Loss',
      'UW Condition Letter',
      'Wind Exclusion',
      'Wind Mitigation'
    ]
  };

  contactTypes = this.props.noteType ? this.contactTypeOptions[this.props.noteType] : [];
  docTypes = this.props.noteType ? this.docTypeOptions[this.props.noteType] : [];

  closeButtonHandler = () => this.props.actions.newNoteActions.toggleNote({});

  submitNote = (data, dispatch, props) => {
    const { actions, user, noteType, documentId, sourceId } = props;
    const attachments = Object.values(this.uppy.getState().files);
    if(!user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
      return false;
    }
    const noteData = {
      number: documentId,
      source: sourceId,
      noteType,
      noteContent: data.noteContent,
      contactType: data.contactType,
      createdAt:  moment().unix(),
      attachmentCount: attachments ? attachments.length : 0,
      fileType: data.fileType,
      createdBy: JSON.stringify({
        userId: user.sub,
        userName: `${user.profile.given_name} ${user.profile.family_name}`
      })
    };

    props.actions.serviceActions.addNote(noteData, attachments);
    this.closeButtonHandler();
  };

  componentWillMount () {
    const idToken = localStorage.getItem('id_token');

    this.uppy = new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: 10000000,
        maxNumberOfFiles: 10
      },
      onBeforeFileAdded: validateFile,
      onBeforeUpload: (files) => {
        if (files) return Promise.resolve();
        return this.uppy.addFile({ source: 'uppy', preview: null, name: 'hidden', type: null, data: new Uint8Array() })
        .then(done => Promise.resolve())
      }
    })
    .use(XHRUpload, {
      endpoint: `${process.env.REACT_APP_API_URL}/upload`,
      formData: true,
      bundle: true,
      fieldName: 'files[]',
      headers: {
        accept: 'application/json',
        authorization: `bearer ${idToken}`
      }
    })
    .run();
  }

  render () {
    return (
      <div className={this.props.appState.data.minimize === true ? 'new-note-file minimize' : 'new-note-file'} >
        <div className="title-bar">
          <div className="title title-minimze-button" onClick={() => minimzeButtonHandler(this.props)}>Note / File</div>
          <div className="controls note-file-header-button-group">
            <button className="btn btn-icon minimize-button" onClick={() => minimzeButtonHandler(this.props)}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
            <button className="btn btn-icon header-cancel-button" onClick={this.closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mainContainer">
          <Form id="NewNoteFileUploader" onSubmit={this.props.handleSubmit(this.submitNote)} noValidate>
              <div className="content">
                <label>Contact</label>
                <Field component="select" name="contactType" disabled={!this.contactTypes.length}>
                  { this.contactTypes.map(option => <option aria-label={option} value={option} key={option}>{ option }</option>) }
                </Field>
                <Field name="noteContent" component={renderNotes} label="Note Content" />
                <label>File Type</label>
                <Field component="select" name="fileType" disabled={!this.docTypes.length}>
                  { this.docTypes.map(option => <option aria-label={option} value={option} key={option}>{ option }</option>) }
                </Field>
                <div className="file-uploader">
                  <Dashboard
                    uppy={this.uppy}
                    maxHeight={350}
                    showProgressDetails={true}
                    hideUploadButton={true}
                  />
              </div>
              </div>
              <div className="buttons note-file-footer-button-group">
                <button tabIndex={'0'} aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.closeButtonHandler}>Cancel</button>
                <button tabIndex={'0'} aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
              </div>
          </Form>
        </div>
      </div>
    );
  }
};

Uploader.propTypes = {
  ...propTypes,
  noteType: PropTypes.string
};

const mapStateToProps = state => ({
  appState: state.appState,
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    newNoteActions: bindActionCreators(newNoteActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NewNoteFileUploader',
  initialValues: { contactType: 'Agent', fileType: 'Other',  },
  validate
})(Uploader));

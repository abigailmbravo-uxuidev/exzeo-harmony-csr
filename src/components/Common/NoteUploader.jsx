import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import XHRUpload from '@uppy/xhr-upload';
import moment from 'moment';
import { Loader } from '@exzeo/core-ui';

import * as cgActions from '../../state/actions/cg.actions';
import * as uiActions from '../../state/actions/ui.actions';
import * as serviceActions from '../../state/actions/service.actions';
import * as errorActions from '../../state/actions/error.actions';

import '@uppy/core/dist/style.min.css';

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
      onBeforeFileAdded: this.validateFile
    }).use(XHRUpload, {
        endpoint: `${process.env.REACT_APP_API_URL}/upload`,
        fieldName: 'files[]',
        headers: {
          accept: 'application/json',
          authorization: `bearer ${idToken}`
        }
    });
  }

  state = { minimize: false }

  minimzeButtonHandler = () => this.setState({ minimize: !this.state.minimize })

  // TODO: Pull this from the list service
  contactTypeOptions = {
    'Quote Note': ['Agent', 'Policyholder', 'Inspector', 'Other'],
    'Policy Note': ['Agent', 'Policyholder', 'Lienholder', 'Internal', 'Inspector', 'Other']
  }

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
  }

  contactTypes = this.props.noteType ? this.contactTypeOptions[this.props.noteType] : []
  docTypes = this.props.noteType ? this.docTypeOptions[this.props.noteType] : []

  closeButtonHandler = () => this.props.actions.uiActions.toggleNote({})

  validateFile = (file, currentFiles) => {
    if (!file.name.includes('.')) {
      this.uppy.info('Uploads must have a file extension.');
      return false;
    }
    return true;
  };

  submitNote = (data, dispatch, props) => {
    const { actions, user, noteType, documentId, sourceId } = props;

    const filelist = Object.values(this.uppy.getState().files);
    const uploads = filelist.filter(file => file.progress.uploadComplete);

    if (filelist.length > uploads.length) {
      this.uppy.info('You have files that are not uploaded.', 'error');
      return false;
    }

    const noteAttachments = uploads.map(file => ({ ...file.response.body, fileType: data.fileType }));
    const noteData = {
      number: documentId,
      source: sourceId,
      noteType,
      noteContent: JSON.stringify(data.noteContent),
      contactType: data.contactType,
      createdAt: moment().unix(),
      noteAttachments,
      createdBy: JSON.stringify({
        userId: user.sub,
        userName: `${user.profile.given_name} ${user.profile.family_name}`
      })
    };

    return actions.cgActions.startWorkflow('addNote', noteData, false)
      .then(result => {
        if (window.location.pathname.includes('/notes')) {
          actions.serviceActions.getNotes(noteData.number, noteData.source);
        }

        this.closeButtonHandler();
      })
      .catch((err) => {
        actions.errorActions.setAppError({ message: err });
        this.closeButtonHandler();
      });
  }

  componentDidMount() {
    const { actions, user } = this.props;
    if (!user.profile || !user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
      return false;
    }
  }

  render() {
    return (
      <div className={this.state.minimize ? 'new-note-file minimize' : 'new-note-file'} >
        <div className="title-bar">
          <div className="title title-minimze-button" onClick={() => this.minimzeButtonHandler(this.props)}>Note / File</div>
          <div className="controls note-file-header-button-group">
            <button className="btn btn-icon minimize-button" onClick={() => this.minimzeButtonHandler(this.props)}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
            <button className="btn btn-icon header-cancel-button" onClick={this.closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
          </div>
        </div>
        <div className="mainContainer">
          {this.props.submitting && <Loader />}
          <Form id="NoteUploader" onSubmit={this.props.handleSubmit(this.submitNote)} noValidate>
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
              <Dashboard
                uppy={this.uppy}
                maxHeight={350}
                proudlyDisplayPoweredByUppy={false}
                metaFields={[{ id: 'name', name: 'Name', placeholder: 'file name' }]}
                showProgressDetails
                hideProgressAfterFinish
              />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.closeButtonHandler}>Cancel</button>
              <button tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

NoteUploader.propTypes = {
  documentId: PropTypes.string.isRequired,
  noteType: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NoteUploader',
  initialValues: { contactType: 'Agent', fileType: 'Other' },
  validate
})(NoteUploader));

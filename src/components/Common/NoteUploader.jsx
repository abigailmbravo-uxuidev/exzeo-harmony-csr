import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, Form, reduxForm } from 'redux-form';
import Uppy from 'uppy/lib/core';
import { DragDrop, ProgressBar, StatusBar } from 'uppy/lib/react';
import { Informer } from './Informer.js';
import XHRUpload from 'uppy/lib/plugins/XHRUpload';
import moment from 'moment';
import Loader from '../Common/Loader';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as newNoteActions from '../../actions/newNoteActions';
import * as serviceActions from '../../actions/serviceActions';
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

export class Uploader extends Component {
  constructor(props) {
    super(props);

    this.uppy = new Uppy({
      autoProceed: true,
      restrictions: {
        maxFileSize: 10000000,
      },
      onBeforeFileAdded: this.validateFile
    })
    .on('upload-success', (file, resp, uploadURL) => {
      this.setState({
        attachments: [...this.state.attachments, resp],
        submitEnabled: true
      })
    }).on('upload-error', (result) => {
      this.setState({ submitEnabled: true });
    }).on('upload', (result) => {
      this.setState({ submitEnabled: false });
    });
  }

  state = {
    attachments: [],
    loading: false,
    submitEnabled: true
  }

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

    if (!user.profile.given_name || !user.profile.family_name) {
      const message = 'There was a problem with your user profile. Please logout of Harmony and try logging in again.';
      this.closeButtonHandler();
      actions.errorActions.setAppError({ message });
      return false;
    }

    this.setState({ loading: true });
    const noteAttachments = this.state.attachments.map(item => ({...item, fileType: data.fileType}));
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

    actions.cgActions.startWorkflow('addNote', noteData)
      .then(result => {
        if(window.location.pathname.endsWith('/notes')) {
          const ids = (noteData.noteType === 'Policy Note')
            ? [noteData.number, noteData.source].toString()
            : noteData.number;
          actions.serviceActions.getNotes(ids, noteData.number);
        }
        this.setState({ loading: false });
        this.closeButtonHandler();
      })
      .catch(err => {
        actions.errorActions.setAppError({ message: err });
        this.setState({ loading: false });
        this.closeButtonHandler();
      });
  }

  validateFile = (file, currentFiles) => !file.name.includes('.')
    ? Promise.reject('Uploads must have a file extension.')
    : Promise.resolve()

  removeUpload = index => () => this.setState((prevState) => ({
    attachments: prevState.attachments.filter((_, i) => i !== index)
  }))

  componentDidMount() {
    const idToken = localStorage.getItem('id_token');
    this.uppy.setMeta({ documentId: this.props.documentId });
    this.uppy.use(XHRUpload, {
        endpoint: `${process.env.REACT_APP_API_URL}/upload`,
        fieldName: 'files[]',
        headers: {
          accept: 'application/json',
          authorization: `bearer ${idToken}`
        }
    }).run();
  }

  render() {
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
          {this.state.loading && <Loader />}
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
                <div className="uppy-DragDrop-wrapper">
                  <DragDrop uppy={this.uppy} maxHeight={350} showProgressDetails hideUploadButton />
                </div>
                <div className="uppy-ProgressBar-wrapper">
                  <ProgressBar uppy={this.uppy} />
                </div>
                <div className="uppy-StatusBar-wrapper">
                  <StatusBar uppy={this.uppy} />
                </div>
                <div className="uppy-Informer-wrapper">
                  <Informer uppy={this.uppy} />
                </div>
                <ul className="upload-list">
                  {this.state.attachments.map((file, i) =>
                    <li key={i}><span>{file.fileName}</span><i className="fa fa-trash" onClick={this.removeUpload(i)} /></li>
                  )}
                </ul>
              </div>
            </div>
            <div className="buttons note-file-footer-button-group">
              <button tabIndex="0" aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={this.closeButtonHandler}>Cancel</button>
              <button tabIndex="0" aria-label="submit-btn form-newNote" className="btn btn-primary submit-button" disabled={!this.state.submitEnabled}>Save</button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

Uploader.propTypes = {
  documentId: PropTypes.string,
  noteType: PropTypes.string
};

const mapStateToProps = state => ({
  appState: state.appState,
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    newNoteActions: bindActionCreators(newNoteActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NewNoteFileUploader',
  initialValues: { contactType: 'Agent', fileType: 'Other' },
  validate
})(Uploader));

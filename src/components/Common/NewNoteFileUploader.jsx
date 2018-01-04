import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Field, Form, reduxForm, propTypes } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
import * as serviceActions from '../../actions/serviceActions';
import * as appStateActions from '../../actions/appStateActions';

export const submitNote = (data, dispatch, props) => {
  const { user, noteType, documentId } = props;
  const noteData = {
    number: documentId,
    noteType,
    noteContent: data.noteContent,
    contactType: data.contactType,
    createdAt:  moment().unix(),
    attachmentCount: data.noteAttachments ? data.noteAttachments.length : 0,
    fileType: data.fileType,
    createdBy: {
      useerId: user.sub,
      userName: user.name
    }
  };

  props.actions.serviceActions.addNote(noteData, data.noteAttachments);
  props.closeButtonHandler();
};

export const minimzeButtonHandler = (props) => {
  if (props.appState.data.minimize) {
    props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, minimize: false });
  } else {
    props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, minimize: true });
  }
};

export const validate = (values) => {
  const errors = {};
  if (!values.noteContent) errors.noteContent = 'Note Content Required';
  return errors;
};

const renderNotes = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    { touched && error && <span className="error-message">{ error }</span> }
  </div>
  );

class renderDropzone extends React.Component {
  constructor() {
    super()
    this.state = {
      dropzoneActive: false
    }
  }

  onDragEnter = () => this.setState({ dropzoneActive: true });

  onDragLeave = () => this.setState({ dropzoneActive: false });

  onDrop = (files) => {
    const field = this.props.input;
    const list = Array.isArray(field.value) ? field.value.concat(files) : files;
    field.onChange(list);
    this.setState({ files, dropzoneActive: false });
  }

  render() {
    const { dropzoneActive } = this.state;
    const files = this.props.input.value ||  [];

    return (
      <div className="dropzone-wrapper">
        <Dropzone
          style={{}}
          onDrop={this.onDrop.bind(this)}
          onDragEnter={this.onDragEnter.bind(this)}
          onDragLeave={this.onDragLeave.bind(this)}
        >
          <ul className="upload-list">
            <div className="drop-area-label">Drop files here or <span>click</span> to select files.</div>
            { files.map((f, i) => <li key={ i }>{f.name} - {f.size} bytes</li>) }
          </ul>
          { dropzoneActive && <div className="dropzone-overlay"><div className="dropzone-drop-area">Drop files...</div></div> }
        </Dropzone>
      </div>
    );
  }
};

export const NewNoteFileUploader = (props, { closeButtonHandler }) => {
  // TODO: Pull this from the list service
  const contactTypeOptions = {
    'Quote Note': [ 'Agent', 'Policyholder', 'Inspector', 'Other' ],
    'Policy Note': [ 'Agent', 'Policyholder', 'Lienholder', 'Claims', 'Inspector', 'Other' ]
  };

  const docTypeOptions = {
    'Quote Note': [
      "4-pt Inspection",
      "Claims Documentation",
      "Consent To Rate Form",
      "Correspondence",
      "Elevation Certificate",
      "Flood Selection Form",
      "Flood Waiver Form",
      "HUD Statement",
      "New Business Application",
      "Other",
      "Proof Of Prior Insurance",
      "Proof Of Repair",
      "Property Inspection",
      "Protection Device Certificate",
      "Quote Summary",
      "Replacement Cost Estimator",
      "Roof Inspection/permit",
      "Sinkhole Loss Questionnaire",
      "Sinkhole Selection/rejection Form",
      "Wind Exclusion",
      "Wind Mitigation"
    ],
    'Policy Note': [
      "4-pt Inspection",
      "AI Change",
      "AOR Change",
      "Cancellation Request",
      "Cancellation/non-renewal Notice",
      "Claims Documentation",
      "Consent To Rate Form",
      "Correspondence",
      "DEC Page",
      "Electronic Payment Receipt",
      "Elevation Certificate",
      "Endorsement",
      "Financial Document",
      "Policy Packet",
      "Flood Selection Form",
      "Flood Waiver Form",
      "HUD Statement",
      "New Business Application",
      "Occupancy Letter",
      "Other",
      "Proof Of Prior Insurance",
      "Proof Of Repair",
      "Property Inspection",
      "Protection Device Certificate",
      "Reinstatement Notice",
      "Renewal Application",
      "Replacement Cost Estimator",
      "Returned Mail",
      "Returned Renewal Application",
      "Roof Inspection/permit",
      "Sinkhole Loss Questionnaire",
      "Sinkhole Selection/rejection Form",
      "Statement Of No Loss",
      "UW Condition Letter",
      "Wind Exclusion",
      "Wind Mitigation"
    ]
  };

  const contactTypes = props.noteType ? contactTypeOptions[props.noteType] : [];
  const docTypes = props.noteType ? docTypeOptions[props.noteType] : [];

  return (
    <div className={props.appState.data.minimize === true ? 'new-note-file minimize' : 'new-note-file'} >
      <div className="title-bar">
        <div className="title title-minimze-button" onClick={() => minimzeButtonHandler(props)}>Note / File</div>
        <div className="controls note-file-header-button-group">
          <button className="btn btn-icon minimize-button" onClick={() => minimzeButtonHandler(props)}><i className="fa fa-window-minimize" aria-hidden="true" /></button>
          <button className="btn btn-icon header-cancel-button" onClick={props.closeButtonHandler} type="submit"><i className="fa fa-times-circle" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="mainContainer">
        <Form id="NewNoteFileUploader" onSubmit={props.handleSubmit(submitNote)} noValidate>
          <div className="content state-initial">
            <div className="flex-contents">
              <label>Note Type</label>
              <Field component="select" name="contactType" disabled={!contactTypes.length}>
                { contactTypes.map(option => <option aria-label={option} value={option} key={option}>{ option }</option>) }
              </Field>
              <Field name="noteContent" component={renderNotes} label="Note Content" />
                <label>Document Type</label>
                <Field component="select" name="fileType" disabled={!docTypes.length}>
                  { docTypes.map(option => <option aria-label={option} value={option} key={option}>{ option }</option>) }
                </Field>
                <Field name="noteAttachments" component={ renderDropzone } />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button aria-label="cancel-btn form-newNote" className="btn btn-secondary cancel-button" onClick={props.closeButtonHandler}>Cancel</button>
              <button  aria-label="submit-btn form-newNote" className="btn btn-primary submit-button">Save</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

NewNoteFileUploader.propTypes = {
  ...propTypes,
  closeButtonHandler: PropTypes.func,
  noteType: PropTypes.string
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  appState: state.appState,
  user: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NewNoteFileUploader',
  initialValues: { contactType: 'Agent', fileType: 'Other' },
  validate
})(NewNoteFileUploader));

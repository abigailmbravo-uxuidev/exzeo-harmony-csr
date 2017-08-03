import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form, reduxForm, propTypes } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';


export const submitNote = (data, dispatch, props) => {
  const { user, noteType, documentId } = props;
  const noteData = {
    number: documentId,
    noteType: noteType,
    noteContent: data.noteContent,
    contactType: 'Agent',
    createdAt: new Date().getTime(),
    noteAttachments: [],
    createdBy:{
      useerId: user.user_id,
      userName: user.username
    },
    updatedBy: {}
  };

  props.actions.cgActions.startWorkflow('addNote', noteData, false);
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
  if (!values.noteContent) errors.noteContent = "Note Content Required";
  return errors;
};

const renderNotes = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    { touched && error && <span className="error-message">{ error }</span> }
  </div>
  );

export const NewNoteFileUploader = (props, { closeButtonHandler }) => {
  // TODO: Pull this from the list service
  const contactTypeOptions = {
    'Quote Note': [
      'Agent', 'Policyholder', 'Inspector', 'Other'
    ],
    'Policy Note': [
      'Agent', 'Policyholder', 'Lienholder', 'Claims', 'Inspector', 'Other'
    ]
  };

  const contactTypes = props.noteType ? contactTypeOptions[props.noteType] : [];


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
                { contactTypes.map(option => <option value={option} key={option}>{ option }</option>) }
              </Field>
              <Field name="noteContent" component={renderNotes} label="Note Content" />
            </div>
            <div className="buttons note-file-footer-button-group">
              <button className="btn btn-primary upload-button">Upload</button>
              <div />
              <button className="btn btn-secondary cancel-button" onClick={props.closeButtonHandler}>Cancel</button>
              <button className="btn btn-primary submit-button">Save</button>
            </div>
          </div>
          {/* <div className="content state-upload" hidden>
            <div className="flex-contents">
              <div className="drag-n-drop">
                Drag and Drop Files
              </div>
            </div>
            <div className="buttons">
              <a href="#" className="btn btn-primary">Choose Files</a>
              <div />
              <a href="#" className="btn btn-secondary">Cancel</a>
            </div>
          </div>*/}
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
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'NewNoteFileUploader',
  initialValues: { contactType: 'Agent' },
  validate
})(NewNoteFileUploader));

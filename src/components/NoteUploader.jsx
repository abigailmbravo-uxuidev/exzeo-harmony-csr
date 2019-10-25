import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Field, Form, reduxForm } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/react/lib/Dashboard';
import XHRUpload from '@uppy/xhr-upload';
import {
  Draggable,
  Select,
  validation,
  Loader,
  Form,
  Field
} from '@exzeo/core-ui';
import { callService } from '@exzeo/core-ui/src/@Harmony';

import {
  toggleNote,
  toggleDiary,
  setNotesSynced
} from '../state/actions/ui.actions';
import { fetchNotes } from '../state/actions/notes.actions';
import { setAppError } from '../state/actions/error.actions';
import { NOTE_OPTION_TYPE } from '../constants/notes';

import '@uppy/core/dist/style.min.css';

export const renderNotes = ({ input, label, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea {...input} placeholder={label} rows="10" cols="40" />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export const validateContentField = value =>
  value ? undefined : 'Note Content Required';

const NoteUploader = props => {
  const [noteOptions, setNoteOptions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [minimize, setMinimize] = useState(false);

  useEffect(() => {
    const fetchNoteOptions = async () => {
      setLoaded(false);
      try {
        const notesConfig = {
          service: 'notes',
          method: 'GET',
          path: `v1/noteOptions?numberType=${
            NOTE_OPTION_TYPE[props.resourceType]
          }`
        };

        const response = await callService(notesConfig, 'getNoteOptions');
        setNoteOptions(response.data.result);
      } catch (error) {
        console.error('Error fetching note options: ', error);
      } finally {
        setLoaded(true);
      }
    };

    fetchNoteOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resourceType]);

  // constructor(props) {
  //   super(props);

  const { companyCode, state, product } = props;

  const contactTypes = noteOptions.validContactTypes || [];
  const docTypes = noteOptions.validFileTypes || [];

  const idToken = localStorage.getItem('id_token');
  const uppy = new Uppy({
    autoProceed: false,
    restrictions: {
      maxFileSize: process.env.REACT_APP_REQUEST_SIZE.slice(0, -2) * 1000000
    },
    meta: { documentId: props.documentId, companyCode, state, product },
    onBeforeFileAdded: validateFile,
    onBeforeUpload: validateUpload
  }).use(XHRUpload, {
    endpoint: `${process.env.REACT_APP_API_URL}/upload`,
    fieldName: 'files[]',
    headers: {
      accept: 'application/json',
      authorization: `bearer ${idToken}`
    }
  });

  const initializeForm = () => {
    const { resourceType } = props;
    const contactType = contactTypes[0];
    const backUpDocType = docTypes[0];

    return {
      contactType,
      fileType: ['Quote', 'Policy'].includes(resourceType)
        ? 'Other'
        : backUpDocType
    };
  };

  const handleMinimize = () =>
    setMinimize(state => ({
      minimize: !minimize
    }));

  const handleClose = () => props.toggleNote({});

  const validateFile = file => {
    if (file.data.size === 0) {
      uppy.info('The file is empty.');
      return false;
    }

    if (!file.data.name.includes('.')) {
      uppy.info('Uploads must have a file extension.');
      return false;
    }
  };

  const validateUpload = files => {
    if (Object.keys(files).some(id => !files[id].meta.name.includes('.'))) {
      uppy.info('The file name must have a file extension.');
      return false;
    }
  };

  const submitNote = async data => {
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

    const filelist = Object.values(uppy.getState().files);
    const uploads = filelist.filter(file => file.progress.uploadComplete);

    if (filelist.length > uploads.length) {
      uppy.info('You have files that are not uploaded.', 'error');
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
      handleClose();
    }
  };

  const { noteType } = props;

  const contactTypeAnswers = contactTypes
    ? contactTypes.map(c => ({ answer: c, label: c }))
    : [];

  const docTypeAnswers = docTypes
    ? docTypes.map(d => ({ answer: d, label: d }))
    : [];

  return (
    <Draggable handle=".title-bar">
      <div className={minimize ? 'new-note-file minimize' : 'new-note-file'}>
        <div className="title-bar">
          <div className="title">
            <i className="fa fa-th" />
            Note / File
          </div>
          <div className="controls note-file-header-button-group">
            <button
              className="btn btn-icon minimize-button"
              onClick={handleMinimize}
            >
              <i className="fa fa-window-minimize" aria-hidden="true" />
            </button>
            <button
              className="btn btn-icon header-cancel-button"
              onClick={handleClose}
              type="submit"
            >
              <i className="fa fa-times" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="mainContainer">
          <Form
            id="NoteUploader"
            onSubmit={submitNote}
            initialValues={initializeForm()}
            subscription={{ submitting: true }}
          >
            {({ handleSubmit, submitting }) => (
              <form id="NoteUploader" onSubmit={handleSubmit}>
                {submitting && <Loader />}
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
                    {noteType !== 'Agency Note' && (
                      <div className="form-group diary-checkbox">
                        <Field
                          component="input"
                          name="openDiary"
                          type="checkbox"
                        />
                        <label>Create & Open Diary On Save</label>
                      </div>
                    )}
                  </div>
                  <Field
                    name="noteContent"
                    component={renderNotes}
                    validate={validateContentField}
                    label="Note Content"
                  />
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
                    uppy={uppy}
                    maxHeight={350}
                    proudlyDisplayPoweredByUppy={false}
                    metaFields={[
                      { id: 'name', name: 'Name', placeholder: 'file name' }
                    ]}
                    showProgressDetails
                    hideProgressAfterFinish
                  />
                </div>
                <div className="buttons note-file-footer-button-group">
                  <button
                    tabIndex="0"
                    aria-label="cancel-btn form-newNote"
                    className="btn btn-secondary cancel-button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    tabIndex="0"
                    aria-label="submit-btn form-newNote"
                    className="btn btn-primary submit-button"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
    </Draggable>
  );
};

NoteUploader.propTypes = {
  documentId: PropTypes.string.isRequired,
  noteType: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  resourceType: PropTypes.string,
  minimizeNote: PropTypes.bool
};

const mapStateToProps = state => ({
  notes: state.notes,
  user: state.authState.userProfile,
  noteOptions: state.list.noteOptions || {}
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
)(NoteUploader);

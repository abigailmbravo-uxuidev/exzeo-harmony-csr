import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  Field,
  SectionLoader,
  Button
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

export const renderNotes = ({
  input,
  label,
  dataTest,
  meta: { touched, error }
}) => (
  <div className={`${touched && error ? 'error' : ''} text-area-wrapper`}>
    <textarea
      {...input}
      placeholder={label}
      data-test={dataTest}
      rows="10"
      cols="40"
    />
    {touched && error && <span className="error-message">{error}</span>}
  </div>
);

export const validateContentField = value =>
  value ? undefined : 'Note Content Required';

// TODO update Uppy to 1.0 as soon as we can
const NoteUploader = ({
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
  toggleNote,
  setNotesSynced,
  entity
}) => {
  const [noteOptions, setNoteOptions] = useState({});
  const [minimize, setMinimize] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const uppy = useRef(null);

  useEffect(() => {
    uppy.current = new Uppy({
      autoProceed: false,
      restrictions: {
        maxFileSize: process.env.REACT_APP_REQUEST_SIZE.slice(0, -2) * 1000000
      },
      meta: { documentId: documentId, companyCode, state, product },
      onBeforeFileAdded: validateFile,
      onBeforeUpload: validateUpload
    }).use(XHRUpload, {
      endpoint: `${process.env.REACT_APP_API_URL}/upload`,
      fieldName: 'files[]',
      headers: {
        accept: 'application/json',
        authorization: `bearer ${localStorage.getItem('id_token')}`
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchNoteOptions = async () => {
      try {
        setLoaded(false);

        const notesConfig = {
          service: 'notes',
          method: 'GET',
          path: `v1/noteOptions?numberType=${NOTE_OPTION_TYPE[resourceType]}`
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
  }, [resourceType]);

  const initializeForm = () => {
    const contactType = contactTypes[0];
    const backUpDocType = docTypes[0];

    return {
      contactType,
      fileType: ['Quote', 'Policy'].includes(resourceType)
        ? 'Other'
        : backUpDocType
    };
  };

  const handleMinimize = () => setMinimize(!minimize);

  const handleClose = () => toggleNote({});

  const validateFile = useCallback(
    file => {
      if (file.data.size === 0) {
        uppy.current.info('The file is empty.');
        return false;
      }

      if (!file.data.name.includes('.')) {
        uppy.current.info('Uploads must have a file extension.');
        return false;
      }
    },
    [uppy]
  );

  const validateUpload = useCallback(
    files => {
      if (Object.keys(files).some(id => !files[id].meta.name.includes('.'))) {
        uppy.current.info('The file name must have a file extension.');
        return false;
      }
    },
    [uppy]
  );

  const submitNote = async data => {
    const mapResourceToNumber = {
      Policy: 'policyNumber',
      Quote: 'quoteNumber',
      Agency: 'agencyCode',
      Agent: 'agentCode'
    };

    const filelist = Object.values(uppy.current.getState().files);
    const uploads = filelist.filter(file => file.progress.uploadComplete);

    if (filelist.length > uploads.length) {
      uppy.current.info('You have files that are not uploaded.', 'error');
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
          resourceId: documentId,
          entity
        });
      }
    } catch (err) {
      setAppError({ message: err });
    } finally {
      handleClose();
    }
  };

  const contactTypes = noteOptions.validContactTypes || [];
  const docTypes = noteOptions.validFileTypes || [];
  const contactTypeAnswers = contactTypes.map(c => ({ answer: c, label: c }));
  const docTypeAnswers = docTypes.map(d => ({ answer: d, label: d }));

  if (!loaded) {
    return (
      <div className="new-note-file">
        <SectionLoader />
      </div>
    );
  }

  return (
    <Draggable handle=".title-bar">
      <div className={classNames('new-note-file', { minimize })}>
        <div className="title-bar">
          <div className="title">
            <i className="fa fa-th" />
            Note / File
          </div>
          <div className="controls note-file-header-button-group">
            <Button
              className={Button.constants.classNames.icon}
              dataTest="minimize-button"
              customClass="minimize-button"
              onClick={handleMinimize}
            >
              <i className="fa fa-window-minimize" aria-hidden="true" />
            </Button>
            <Button
              className={Button.constants.classNames.icon}
              dataTest="header-cancel-button"
              customClass="header-cancel-button"
              onClick={handleClose}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </Button>
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
                    dataTest="noteContent"
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
                  {uppy && uppy.current && (
                    <Dashboard
                      uppy={uppy.current}
                      maxHeight={350}
                      proudlyDisplayPoweredByUppy={false}
                      metaFields={[
                        { id: 'name', name: 'Name', placeholder: 'file name' }
                      ]}
                      showProgressDetails
                      hideProgressAfterFinish
                    />
                  )}
                </div>
                <div className="buttons note-file-footer-button-group">
                  <Button
                    className={Button.constants.classNames.secondary}
                    customClass="form-newNote"
                    dataTest="cancel-button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    customClass="form-newNote"
                    dataTest="submit-button"
                    type="submit"
                  >
                    Save
                  </Button>
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
  resourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  companyCode: PropTypes.string,
  state: PropTypes.string,
  product: PropTypes.string,
  user: PropTypes.object
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
)(NoteUploader);

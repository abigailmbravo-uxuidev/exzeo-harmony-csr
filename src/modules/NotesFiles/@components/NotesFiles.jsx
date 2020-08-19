import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionLoader } from '@exzeo/core-ui';
import { useFetchNotes } from '../hooks';
import {
  NOTE_TYPE,
  DIARY_TAB,
  FILES_TAB,
  NOTE_TAB,
  POLICY_RESOURCE_TYPE,
  QUOTE_RESOURCE_TYPE
} from '../constants';
import * as notesUtils from '../utilities';
import NotesTable from './NotesTable';
import FilesTable from './FilesTable';
import DiariesTable from './DiariesTable';

function NotesFiles({ options, customHandlers, initialValues }) {
  const [selectedTab, setSelectedTab] = useState(NOTE_TYPE.notes);

  // Check for sourceNumber since PolicyNumber is returned for a quote that is Policy Issued
  const sourceNumbers = initialValues.sourceNumber
    ? [initialValues.policyNumber, initialValues.sourceNumber]
    : [initialValues.quoteNumber];
  const numberType = initialValues.sourceNumber
    ? 'policyNumber'
    : 'quoteNumber';

  const { notes, notesLoaded } = useFetchNotes(
    sourceNumbers,
    numberType,
    customHandlers.notesSynced
  );

  const allNotes = notes.filter(n => n.noteContent);
  const notesWithAttachments = notes.filter(n => n.noteAttachments.length > 0);
  const diaries = notesUtils.getDiariesForTable(
    options.diaries,
    options.diaryOptions
  );

  if (!notesLoaded) {
    return <SectionLoader />;
  }

  return (
    <div className="notes-list fade-in">
      <div className="note-grid-wrapper btn-tabs">
        <div className="filter-tabs">
          <button
            type="button"
            name="notes"
            className={classNames('btn btn-tab', {
              selected: selectedTab === NOTE_TYPE.notes
            })}
            onClick={() => setSelectedTab(NOTE_TYPE.notes)}
          >
            Notes
          </button>
          <button
            type="button"
            name="files"
            className={classNames('btn btn-tab', {
              selected: selectedTab === NOTE_TYPE.files
            })}
            onClick={() => setSelectedTab(NOTE_TYPE.files)}
          >
            Files
          </button>
          <button
            type="button"
            name="diaries"
            className={classNames('btn btn-tab', {
              selected: selectedTab === NOTE_TYPE.diaries
            })}
            onClick={() => setSelectedTab(NOTE_TYPE.diaries)}
          >
            Diaries
          </button>
        </div>
        {selectedTab === NOTE_TAB && (
          <NotesTable
            data={allNotes}
            errorHandler={customHandlers.setAppError}
          />
        )}
        {selectedTab === FILES_TAB && (
          <FilesTable
            data={notesWithAttachments}
            errorHandler={customHandlers.setAppError}
          />
        )}
        {selectedTab === DIARY_TAB && (
          <DiariesTable
            data={diaries}
            toggleDiary={customHandlers.toggleDiary}
            document={initialValues}
            sourceNumbers={sourceNumbers}
            documentType={
              numberType === 'policyNumber'
                ? POLICY_RESOURCE_TYPE
                : QUOTE_RESOURCE_TYPE
            }
          />
        )}
      </div>
    </div>
  );
}

NotesFiles.propTypes = {
  options: PropTypes.shape({}).isRequired,
  customHandlers: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired
};

export default NotesFiles;

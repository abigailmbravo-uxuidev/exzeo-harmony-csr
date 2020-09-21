import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionLoader } from '@exzeo/core-ui';

import { NOTE_TYPE, DIARY_TAB, FILES_TAB, NOTE_TAB } from '../constants';
import { useFetchNotes } from '../hooks';
import { determineSource } from '../utilities';
import NotesTable from './NotesTable';
import FilesTable from './FilesTable';
import DiariesTable from '../../Diaries/@components/DiariesTable';

function NotesFiles({ customHandlers, initialValues }) {
  const [selectedTab, setSelectedTab] = useState(NOTE_TYPE.notes);

  const { sourceNumbers, sourceType } = determineSource(initialValues);

  const { notes, notesLoaded } = useFetchNotes(
    sourceNumbers,
    sourceType,
    // TODO this will not be needed once we refactor notes.
    customHandlers.notesSynced
  );

  const timezone = initialValues.property?.timezone ?? 'America/New_York';
  const allNotes = notes.filter(n => n.noteContent);
  const notesWithAttachments = notes.filter(n => n.noteAttachments.length > 0);

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
            sourceType={sourceType}
            errorHandler={customHandlers.setAppError}
            timezone={timezone}
          />
        )}
        {selectedTab === FILES_TAB && (
          <FilesTable
            data={notesWithAttachments}
            sourceType={sourceType}
            errorHandler={customHandlers.setAppError}
            timezone={timezone}
          />
        )}
        {selectedTab === DIARY_TAB && <DiariesTable document={initialValues} />}
      </div>
    </div>
  );
}

NotesFiles.propTypes = {
  customHandlers: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired
};

export default NotesFiles;

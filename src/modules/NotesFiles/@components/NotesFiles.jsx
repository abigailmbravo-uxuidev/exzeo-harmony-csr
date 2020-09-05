import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionLoader } from '@exzeo/core-ui';

import { useDiaries } from '../../../context/diaries-context';
import { formatDiariesForTable } from '../../Diaries';

import { NOTE_TYPE, DIARY_TAB, FILES_TAB, NOTE_TAB } from '../constants';
import { useFetchNotes } from '../hooks';
import { determineSource } from '../utilities';
import NotesTable from './NotesTable';
import FilesTable from './FilesTable';
import DiariesTable from './DiariesTable';

function NotesFiles({ customHandlers, initialValues }) {
  const [selectedTab, setSelectedTab] = useState(NOTE_TYPE.notes);
  const { diaries, diaryEnums, diariesDispatch } = useDiaries();

  const { sourceNumbers, sourceType } = determineSource(initialValues);

  const { notes, notesLoaded } = useFetchNotes(
    sourceNumbers,
    sourceType,
    // TODO this will not be needed once we refactor notes.
    customHandlers.notesSynced
  );

  const allNotes = notes.filter(n => n.noteContent);
  const notesWithAttachments = notes.filter(n => n.noteAttachments.length > 0);
  const formattedDiaries = formatDiariesForTable(diaries, diaryEnums);

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
            data={formattedDiaries}
            diariesDispatch={diariesDispatch}
            document={initialValues}
          />
        )}
      </div>
    </div>
  );
}

NotesFiles.propTypes = {
  customHandlers: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired
};

export default NotesFiles;

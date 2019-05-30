import React, { useState } from 'react';
import classNames from 'classnames';
import { shape } from 'prop-types'
import { SectionLoader } from '@exzeo/core-ui';

import { NOTE_TYPE, DIARY_TAB, FILES_TAB, NOTE_TAB } from '../constants';
import { useFetchNotes } from '../hooks';
import DiaryTable from './DiaryTable';
import Notes from './Notes';

function NotesFiles ({ options, customHandlers, initialValues }) {
  const [selectedTab, setSelectedTab] = useState(NOTE_TYPE.notes);
  const { notes, notesLoaded } = useFetchNotes([initialValues.quoteNumber], 'quoteNumber');

  if(!notesLoaded) {
    return <SectionLoader />
  }

  return (
    <div className="notes-list fade-in">
      <div className="note-grid-wrapper btn-tabs">
        <div className="filter-tabs">
          <button type="button" className={classNames('btn btn-tab', { 'selected': selectedTab === NOTE_TYPE.notes })} onClick={() => setSelectedTab(NOTE_TYPE.notes)}>Notes</button>
          <button type="button" className={classNames('btn btn-tab', { 'selected': selectedTab === NOTE_TYPE.files })} onClick={() => setSelectedTab(NOTE_TYPE.files)}>Files</button>
          <button type="button" className={classNames('btn btn-tab', { 'selected': selectedTab === NOTE_TYPE.diaries })} onClick={() => setSelectedTab(NOTE_TYPE.diaries)}>Diaries</button>
        </div>
        {(selectedTab === NOTE_TAB || selectedTab === FILES_TAB) &&
          <Notes notes={notes} customHandlers={customHandlers} attachmentStatus={selectedTab === NOTE_TYPE.files} />
        }

        {selectedTab === DIARY_TAB &&
          <DiaryTable customHandlers={customHandlers} diaries={options.diaries} entityEndDate={initialValues.endDate} />
        }
      </div>
    </div>
  );
};

NotesFiles.propTypes = {
  customHandlers: shape({}).isRequired,
  options: shape({}).isRequired
};

export default NotesFiles;

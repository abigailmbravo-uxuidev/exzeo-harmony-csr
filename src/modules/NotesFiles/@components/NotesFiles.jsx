import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types'

import Notes from './Notes';
import DiaryTable from './DiaryTable';
import { NOTE_TYPE, NOTE_TABS, DIARY_TAB, QUOTE_RESOURCE_TYPE } from '../constants';
import { useFetchNotes, useFetchDiaries } from '../hooks';
import { SectionLoader } from '@exzeo/core-ui/src';

function NotesFiles ({ options, customHandlers, initialValues }) {
  const [historyTab, setHistoryTab] = useState(NOTE_TYPE.notes);
  const { notes, notesLoaded } = useFetchNotes([initialValues.quoteNumber], 'quoteNumber');
  const { diaries, diariesLoaded } = useFetchDiaries({ resourceId: initialValues.quoteNumber, resourceType: QUOTE_RESOURCE_TYPE });

  if(!notesLoaded || !diariesLoaded) {
    return <SectionLoader />
  }

  return (
    <div className="notes-list">
      <div className="note-grid-wrapper btn-tabs">
        <div className="filter-tabs">
          <button type="button" className={`btn btn-tab ${historyTab === NOTE_TYPE.notes ? 'selected' : ''}`} onClick={() => setHistoryTab(NOTE_TYPE.notes)}>Notes</button>
          <button type="button" className={`btn btn-tab ${historyTab === NOTE_TYPE.files ? 'selected' : ''}`} onClick={() => setHistoryTab(NOTE_TYPE.files)}>Files</button>
          <button type="button" className={`btn btn-tab ${historyTab === NOTE_TYPE.diaries ? 'selected' : ''}`} onClick={() => setHistoryTab(NOTE_TYPE.diaries)}>Diaries</button>
        </div>
        {NOTE_TABS.includes(historyTab) && <Notes notes={notes} customHandlers={customHandlers} attachmentStatus={historyTab === NOTE_TYPE.files} />}
        {DIARY_TAB === historyTab && <DiaryTable customHandlers={customHandlers} diaries={diaries} entityEndDate={initialValues.endDate} />}
      </div>
    </div>
  );
};

NotesFiles.propTypes = {
  customHandlers: shape({}).isRequired,
  options: shape({}).isRequired
};

export default NotesFiles;

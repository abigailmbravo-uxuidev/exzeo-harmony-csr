import React, { useEffect, useState } from 'react';
import { shape } from 'prop-types'

import Notes from './Notes';
import DiaryTable from './DiaryTable';
import { NOTE_TYPE, NOTE_TABS, DIARY_TAB } from '../constants';

function NotesFiles ({ options, customHandlers, initialValues }) {
  const [historyTab, setHistoryTab] = useState(NOTE_TYPE.notes);

  const { notes, diaries } = options;
  useEffect(() => {
    customHandlers.fetchNotes([initialValues.quoteNumber], 'quoteNumber')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
}

NotesFiles.propTypes = {
  customHandlers: shape({}).isRequired,
  options: shape({}).isRequired
};

export default NotesFiles;

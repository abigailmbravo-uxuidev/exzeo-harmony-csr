import React, { useEffect } from 'react';

import NoteList from './NoteList';
import { emptyObject } from '@exzeo/core-ui/src';

function NotesFiles ({ options, customHandlers }) {

  const { notes, diaries } = options;
  useEffect(() => {
    customHandlers.getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (<NoteList notes={notes} diaries={diaries} customHandlers={customHandlers} />);
};

NotesFiles.defaultProps = {
  customHandlers: emptyObject,
  options: emptyObject
};

export default NotesFiles;

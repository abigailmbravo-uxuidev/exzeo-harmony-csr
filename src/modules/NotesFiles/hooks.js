import { useState, useEffect } from 'react';
import { fetchNotes, fetchFiles } from './data';
import { mergeNotes, formatNotes } from './utilities';
import { removeTerm } from '../../utilities/format';

export const useFetchNotes = (sourceNumbers, numberType, notesSynced) => {
  const [notes, setNotes] = useState([]);
  const [notesLoaded, setNotesLoaded] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      setNotesLoaded(false);
      try {
        const notesQuery = sourceNumbers.map((number, i) => {
          const noteType = i === 0 ? numberType : 'quoteNumber';
          return {
            number: removeTerm(number),
            numberType: noteType
          };
        });

        const filesQuery = sourceNumbers.join(',');

        const [notes, files] = await Promise.all([
          await fetchNotes(notesQuery, 'fetchNotes'),
          await fetchFiles(filesQuery, 'fetchFiles')
        ]);

        const allNotes = mergeNotes(
          notes.data.result,
          files.data.result,
          numberType
        );

        setNotes(formatNotes(allNotes));
      } catch (error) {
        console.error('Error fetching notes: ', error);
      } finally {
        setNotesLoaded(true);
      }
    };

    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesSynced]);

  return {
    notes,
    notesLoaded
  };
};

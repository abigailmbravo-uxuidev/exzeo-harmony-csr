import React, { useState, useEffect } from 'react'
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import { mergeNotes, removeTerm } from './utilities';

export const useFetchNotes = (numbers, numberType) => {
  const [notes, setNotes] = useState([])
  const [notesLoaded, setNotesLoaded] = useState(false)

  useEffect(() => {
     const fetchNotes = async () => {
      setNotesLoaded(false);
      try {
        const notesQuery = numbers.map((number, i) => {
          const noteType = i === 0 ? numberType : 'quoteNumber';
          return { number: removeTerm(number), numberType: noteType };
        });
      
        const filesQuesry = numbers.map(number => number).join(',');
      
        const notesConfig = {
          exchangeName: 'harmony',
          routingKey: 'harmony.note.getNotes',
          data: { data: notesQuery, }
        };
      
        const filesConfig = {
          service: 'file-index',
          method: 'GET',
          path: `v1/fileindex/${filesQuesry}`
        };

        const [notes, files] = await Promise.all([
          await serviceRunner.callService(notesConfig, 'fetchNotes'),
          numberType === 'policyNumber' ? await serviceRunner.callService(filesConfig, 'fetchFiles') : []
        ]);
        const allNotes = files.data
          ? mergeNotes(notes.data.result, files.data.result)
          : notes.data.result;

          setNotes(allNotes);

    } catch (error) {
      console.error('Error fetching notes: ', error)
    }
    finally{
      setNotesLoaded(true);
    }
  }

    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { notes, notesLoaded };
}

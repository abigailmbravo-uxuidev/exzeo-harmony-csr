import React from 'react';
import { mount } from 'enzyme';
import NoteList, { SearchPanel, filterNotesByType, Notes } from './NoteList';

describe('Testing NotesFiles component', () => {
  const props = {
    notes: [
      {
        createdDate: new Date(),
        createdBy: { userName: 'Tester' },
        contactType: 'Other',
        content: 'Test Note',
        attachments: [
          { fileName: 'testfile', fileUrl: 'test/file.txt'}
        ],
      }
    ],
    attachmentStatus: false,
    actions: {
      errorActions: {
        setAppError() { }
      }
    }
  };

  it('should render', () => {
    const wrapper = mount(<NoteList {...props} />);
    expect(wrapper);
    expect(wrapper.find('.notes-list')).toHaveLength(1);
  });
});
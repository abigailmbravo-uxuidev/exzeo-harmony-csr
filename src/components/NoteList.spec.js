import React from 'react';
import { mount } from 'enzyme';
import NoteList, { filterNotesByType, Notes } from './NoteList';

describe('Testing NotesFiles component', () => {
  const props = {
    notes: [
      {
        _id: '1234',
        createdDate: new Date(),
        createdBy: { userId: 'auth0|TESTUSER|0', userName: 'Tester' },
        noteContactType: 'Other',
        noteContent: 'Test Note',
        noteAttachments: []
      },
      {
        _id: '2345',
        createdDate: new Date(),
        createdBy: { userId: 'auth0|SYSTEM|0', userName: 'System' },
        noteContactType: 'System',
        noteAttachments: [
          {
            fileName: 'test.pdf',
            fileUrl: 'http://test.com/test.pdf'
          }
        ]
      }
    ],
    attachmentStatus: false,
    setAppError: jest.fn()
  };

  it('should render NoteList', () => {
    const wrapper = mount(<NoteList {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('NoteList')).toHaveLength(1);
    expect(wrapper.find('.notes-list')).toHaveLength(1);
  });

  it('should render Notes', () => {
    const wrapper = mount(<Notes {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('Should filter notes', () => {
    it('should filter notes without attachments', () => {
      const result = filterNotesByType(props.notes, false);
      expect(result).toEqual([props.notes[0]]);
    });

    it('should filter notes with attachments', () => {
      const result = filterNotesByType(props.notes, true);
      expect(result).toEqual([props.notes[1]]);
    });

    it('should return empty array', () => {
      const result = filterNotesByType(null);
      expect(result).toEqual([]);
    });
  });
});

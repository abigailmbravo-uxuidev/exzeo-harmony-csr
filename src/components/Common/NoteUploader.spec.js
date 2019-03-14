import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';

import NoteUploader, { validate, renderNotes } from './NoteUploader';

describe('Testing NoteUploader component', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  describe('Testing NoteUploader instance', () => {
    let initialState;
    let props;
    let formData;
    let store;
    let wrapper;
    let instance;

    beforeEach(() => {
      initialState = {
        ui: {
          diary: {},
          note: {},
          minimizeDiary: false,
          minimizeNote: false
        },
        authState: {
          userProfile: {
            profile: {
              given_name: 'Test',
              family_name: 'Test'
            }
          }
        },
        appState: {
          data: {
            minimize: false
          }
        }
      };

      props = {
        minimizeNote: false,
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        documentId: 'testid',
        noteType: 'Policy Note',
        resourceType: 'Policy'
      };

      formData = {
        noteContent: 'test note',
        fileType: 'test',
        contactType: 'Agent'
      };

      store = mockStore(initialState);
      wrapper = shallow(<NoteUploader store={store} {...props} />);
      instance = wrapper.dive().dive().dive().dive()
        .instance();
    });

    it('should map state to props', () => {
      expect(wrapper.props().user).toEqual({ profile: { given_name: 'Test', family_name: 'Test' } });
    });

    it('should submit note', () => {
      instance.props.actions.cgActions.startWorkflow = jest.fn().mockImplementation(() =>
        Promise.resolve({ result: true }));

      expect(instance.submitNote(formData, store.dispatch, instance.props));
      expect(instance.props.actions.cgActions.startWorkflow).toHaveBeenCalled();
    });
  });

  describe('component should close if profile is missing', () => {
    it('note should be valid', () => {
      const initialState = {
        authState: {
          userProfile: { }
        },
        appState: {
          data: {
            minimize: false
          }
        },
        error: {}
      };

      const props = {
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        documentId: 'testid',
        noteType: 'Policy Note',
        resourceType: 'Policy'
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NoteUploader store={store} {...props} />);
      const instance = wrapper.dive().dive().dive().dive()
        .instance();
      const spy = jest.spyOn(instance, 'handleClose');

      instance.componentDidMount();

      expect(instance.handleClose).toHaveBeenCalled();
    });
  });

  describe('Testing NoteUploader functions', () => {
    it('note should be valid', () => {
      const valid = validate({ noteContent: 'Test Content' });
      expect(valid).toEqual({});
    });

    it('note should not be valid', () => {
      const valid = validate({});
      expect(valid).toEqual({ noteContent: 'Note Content Required' });
    });

    it('should render Notes', () => {
      const note = {
        input: 'test',
        label: 'test',
        type: 'textarea',
        meta: { touched: false, error: null }
      };
      const renderNote = renderNotes(note);
      expect(renderNote.type).toEqual('div');
      expect(renderNote.props.className).toEqual(' text-area-wrapper');
    });

    it('should render Notes error', () => {
      const note = {
        input: 'test',
        label: 'test',
        type: 'textarea',
        meta: { touched: true, error: true }
      };
      const renderNote = renderNotes(note);
      expect(renderNote.type).toEqual('div');
      expect(renderNote.props.className).toEqual('error text-area-wrapper');
    });
  });
});

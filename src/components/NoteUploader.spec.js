import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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
          minimize: false
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
        minimize: false,
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
      instance = wrapper
        .dive()
        .dive()
        .dive()
        .dive()
        .instance();
    });

    it('should map state to props', () => {
      expect(wrapper.props().user).toEqual({
        profile: { given_name: 'Test', family_name: 'Test' }
      });
    });

    it('should submit note', () => {
      serviceRunner.callService = jest.fn();

      expect(instance.submitNote(formData, store.dispatch, instance.props));
      expect(serviceRunner.callService).toHaveBeenCalled();
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

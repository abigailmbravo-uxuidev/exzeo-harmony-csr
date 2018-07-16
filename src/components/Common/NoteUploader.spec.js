import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { mount, shallow } from 'enzyme';
<<<<<<< HEAD
import * as serviceActions from '../../actions/serviceActions';
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
        authState: {
          userProfile: {
            profile: {
              given_name: 'Test',
              family_name: "Test"
            }
          }
=======
import * as serviceActions from '../../state/actions/serviceActions';
import ConnectedApp, { minimzeButtonHandler, validate, renderNotes, Uploader } from './NoteUploader';

const localStorageMock = {
  getItem() {},
  setItem() {},
  clear() {}
};
global.localStorage = localStorageMock;
const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing NoteUploader component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        serviceActions: {
          addNote() {}
        },
        newNoteActions: {
          toggleNote() {}
>>>>>>> develop
        },
        appState: {
          data: {
            minimize: false
          }
        }
      };

      props = {
        documentId: 'testid',
        noteType: 'Policy Note'
      };

      formData = {
        noteContent: 'test note',
        fileType: 'test',
        contactType: 'Agent'
      };

      store = mockStore(initialState);
      wrapper = shallow(<NoteUploader store={store} {...props} />);
      instance = wrapper.dive().dive().dive().dive().instance();
    });

    it('should map state to props', () => {
      expect(wrapper.props().user).toEqual({ profile: { given_name: 'Test', family_name: 'Test' } });
    });

    it('test minimzeButtonHandler', () => {
      expect(instance.state.minimize).toEqual(false);
      instance.minimzeButtonHandler();
      expect(instance.state.minimize).toEqual(true);
    });

    it('should submit note', () => {
      Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: '/notes'
      });
      
      instance.props.actions.cgActions.startWorkflow = jest.fn().mockImplementation(() =>
        Promise.resolve({result: true}));

      expect(instance.submitNote(formData, store.dispatch, instance.props));
      expect(instance.props.actions.cgActions.startWorkflow).toHaveBeenCalled();
    });
  });

  describe('component should close if profile is missing', () => { 
    it('note should be valid', () => {
      const initialState = {
        authState: {
          userProfile: {  }
        },
        appState: {
          data: {
            minimize: false
          }
        },
        error: {}
      };

      const props = {
        documentId: 'testid',
        noteType: 'Policy Note'
      };

      const store = mockStore(initialState);
      const wrapper = shallow(<NoteUploader store={store} {...props} />); 
      const instance = wrapper.dive().dive().dive().dive().instance();
      const spy = jest.spyOn(instance, 'closeButtonHandler');

      instance.componentDidMount();

      expect(instance.closeButtonHandler).toHaveBeenCalled();
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
import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { mount, shallow } from 'enzyme';
import * as serviceActions from '../../actions/serviceActions';
import ConnectedApp, { minimzeButtonHandler, validate, renderNotes, Uploader } from './NoteUploader';

const localStorageMock = {
  getItem() {},
  setItem() {},
  clear() {}
};
global.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing NoteUploader component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {
        userProfile: {
          profile: {
            given_name: 'Test',
            family_name: "Test"
          }
        }
      },
      appState: {
        data: {
          minimize: false
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      documentId: 'testid',
      noteType: 'Policy Note'
    };
    const formData = {
      noteContent: 'test note',
      fileType: 'test',
      contactType: 'Agent'
    };

    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: '/notes'
    });

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    const component = wrapper.dive().dive().dive().dive();
    const instance = component.instance();
    expect(instance.state).toEqual({ attachments: [], isSubmitting: false, submitEnabled: true });

    instance.props.actions.cgActions.startWorkflow = jest.fn().mockImplementation(() =>
      Promise.resolve({result: true}));

    instance.state.attachments = [{fileName: 'test.jpg'}];
    expect(instance.removeUpload(0)());
    expect(instance.state.attachments).toHaveLength(0);

    expect(instance.submitNote(formData, store.dispatch, instance.props));
    expect(instance.props.actions.cgActions.startWorkflow).toHaveBeenCalled();
  });

  it('should test empty profile', () => {
    const initialState = {
      authState: {
        userProfile: {
          profile: {}
        }
      },
      appState: {
        data: {
          minimize: false
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      documentId: 'testid',
      noteType: 'Policy Note'
    };
    const formData = {
      noteContent: 'test note',
      fileType: 'test',
      contactType: 'Agent'
    };

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    const component = wrapper.dive().dive().dive().dive();
    const instance = component.instance();
    expect(instance.submitNote(formData, store.dispatch, instance.props));
  });

  it('should test submit note and minimzeButtonHandler', () => {
    const initialState = {
      authState: {
      }
    };
    const store = mockStore(initialState);
    const props = {
      user: {
        user_id: '2342'
      },
      closeButtonHandler() {},
      actions: {
        cgActions: {
          startWorkflow() {}
        },
        appStateActions: {
          setAppState() {}
        },
        serviceActions: {
          addNote() {}
        },
        errorActions: {
          setAppError() {}
        }
      },
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };

    minimzeButtonHandler(props);

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);

    props.appState.data.minimize = true;

    wrapper.setProps(props);

    minimzeButtonHandler(props);
  });

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

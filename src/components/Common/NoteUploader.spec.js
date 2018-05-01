import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
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
        },
        errorActions: {
          setAppError() {}
        }
      },
      closeButtonHandler() {},
      user: {
        profile: {}
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      handleSubmit() {}
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance().props.fieldQuestions).toEqual([]);

    const wrapper2 = shallow(<Uploader store={store} {...props} />);
    wrapper2.instance().submitNote({}, props.dispatch, props);

    props.user = {
      profile: { family_name: 'test', given_name: 'test' }
    };
    const wrapper3 = shallow(<Uploader store={store} {...props} />);
    wrapper3.instance().submitNote({}, props.dispatch, props);
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
      fieldQuestions: [],
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
    expect(wrapper.instance().props.fieldQuestions).toEqual([]);

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

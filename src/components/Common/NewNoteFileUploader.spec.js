import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { mount, shallow } from 'enzyme';
import * as serviceActions from '../../actions/serviceActions';
import ConnectedApp, { submitNote, minimzeButtonHandler, validate, RenderDropzone, renderNotes, NewNoteFileUploader } from './NewNoteFileUploader';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing NewNoteFileUploader component', () => {
  it('should test connected app', () => {
    const initialState = {
      authState: {
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
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
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance().props.fieldQuestions).toEqual([]);
  });

  it('should test submit note and minimzeButtonHandler', () => {
    const initialState = {
      authState: {
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
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

    submitNote({}, props.dispatch, props);
    minimzeButtonHandler(props);

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper.instance().props.fieldQuestions).toEqual([]);

    props.appState.data.minimize = true;

    wrapper.setProps(props);

    minimzeButtonHandler(props);
  });

  it('should test NewNoteFileUploader', () => {
    const initialState = {
      authState: {
      },
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      user: {
        user_id: '2342'
      },
      closeButtonHandler() {},
      actions: {
        appStateActions: {
          setAppState() {}
        },
        serviceActions: {
          addNote() {}
        }
      },
      handleSubmit() {},
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };

    NewNoteFileUploader(props, { function() {} });
  });

  it('should test RenderDropzone', () => {
    const props = {
      input: {
        name: 'upload',
        value: [],
        onChange() { this.value }
      }
    }

    const wrapper = shallow(<RenderDropzone {...props} />);
    const onDragEnter = wrapper.instance().onDragEnter();
    const onDragLeave = wrapper.instance().onDragLeave();
    const onDrop = wrapper.instance().onDrop([]);
    expect(wrapper);
  });

  it('note should be valid', () => {
    const valid = validate({noteContent: 'Testst Content'});
    expect(valid).toEqual({});
  });

  it('note should not be valid', () => {
    const valid = validate({});
    expect(valid).toEqual({ noteContent: 'Note Content Required' });
  });

  it('should render Notes', () => {
    const note  = { 
      input:'test', 
      label: 'test', 
      type: 'textarea', 
      meta: { touched: false, error: null } 
    }
    const renderNote = renderNotes(note);
    expect(renderNote.type).toEqual('div');
    expect(renderNote.props.className).toEqual(' text-area-wrapper');
  });

  it('should render Notes error', () => {
    const note  = { 
      input:'test', 
      label: 'test', 
      type: 'textarea', 
      meta: { touched: true, error: true } 
    }
    const renderNote = renderNotes(note);
    expect(renderNote.type).toEqual('div');
    expect(renderNote.props.className).toEqual('error text-area-wrapper');
  });
});

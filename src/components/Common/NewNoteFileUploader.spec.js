import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import * as serviceActions from '../../actions/serviceActions';
import ConnectedApp, { submitNote, minimzeButtonHandler, NewNoteFileUploader } from './NewNoteFileUploader';

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
});

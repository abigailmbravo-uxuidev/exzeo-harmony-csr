import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import * as serviceActions from '../../actions/serviceActions';
import ConnectedApp, { submitNote } from './NewNoteFileUploader';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing NewNoteFileUploader component', () => {
  it('should test connected app', () => {
    const initialState = {
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
});

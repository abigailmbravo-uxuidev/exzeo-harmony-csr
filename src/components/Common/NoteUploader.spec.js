import React from 'react';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { propTypes } from 'redux-form';
import { mount, shallow } from 'enzyme';
import * as serviceActions from '../../actions/serviceActions';
import NoteUploader, { minimzeButtonHandler, validate, renderNotes } from './NoteUploader';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let initialState;
let props;
let formData;

describe('Testing NoteUploader component', () => { 
  beforeEach(() => {
    initialState = {
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

    props = {
      documentId: 'testid',
      noteType: 'Policy Note'
    };

    formData = {
      noteContent: 'test note',
      fileType: 'test',
      contactType: 'Agent'
    };
  });

  it('should map state to props', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<NoteUploader store={store} {...props} />);
    //console.log(wrapper.props())
    expect(wrapper.props().appState).toEqual({ data: { minimize: false } });
    expect(wrapper.props().user).toEqual({ profile: { given_name: 'Test', family_name: 'Test' } });
  });

  it('should map state to props', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<NoteUploader store={store} {...props} />).dive().dive().dive().dive();
    console.log(wrapper.debug())
  });
});
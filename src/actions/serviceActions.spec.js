import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  it('should call serviceRequest', () => {
    const initialState = {};
    const store = mockStore(initialState);


    const stateObj = [{
      type: types.SERVICE_REQUEST,
      undefined
    }];

    store.dispatch(serviceActions.serviceRequest());
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call start getNotes', () => {
    const mockAdapter = new MockAdapter(axios);
    const note = {
      noteType: 'test',
      noteContent: 'test',
      contactType: 'Agent',
      createdAt: new Date().getTime(),
      noteAttachments: [],
      createdBy: {},
      updatedBy: {}
    };
    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'notes.services',
        method: 'GET',
        path: 'v1/notes/?test=test'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [note]
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getNotes('test', 'test')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  // it('should call start addNotes', () => {
  //   const mockAdapter = new MockAdapter(axios);
  //   const createdAt = new Date().getTime();
  //   const note = {
  //     noteType: 'test1',
  //     noteContent: 'test1',
  //     contactType: 'Agent',
  //     createdAt,
  //     noteAttachments: [],
  //     createdBy: {},
  //     updatedBy: {}
  //   };
  //   const axiosOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     url: `${process.env.REACT_APP_API_URL}/svc`,
  //     data: {
  //       service: 'notes.services',
  //       method: 'POST',
  //       path: 'v1/note/',
  //       data: note
  //     }
  //   };

  //   mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
  //     data: [note]
  //   });

  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   return serviceActions.addNote(null, 'test1', { noteContent: 'test1' })(store.dispatch)
  //     .then(() => {
  //       expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
  //     });
  // });
});

import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as types from './actionTypes';
import * as cgActions from './cgActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('CG Actions', () => {
  it('should call start', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      workflowId: '123'
    };
    const newWorkflowData = {};
    newWorkflowData[inputProps.modelName] = {};
    newWorkflowData[inputProps.modelName].data = inputProps.workflowId;

    const stateObj = [{
      type: types.CG_START,
      workflowData: newWorkflowData
    }];

    store.dispatch(cgActions.start(inputProps.modelName, inputProps.workflowId));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call complete', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      workflowId: '123'
    };
    const newWorkflowData = {};
    newWorkflowData[inputProps.modelName] = {};
    newWorkflowData[inputProps.modelName].data = inputProps.workflowId;

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: newWorkflowData
    }];

    store.dispatch(cgActions.complete(inputProps.modelName, inputProps.workflowId));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call start workflow thunk', () => {
    const mockAdapter = new MockAdapter(axios);
    const data = {
      modelName: 'quoteModel',
      data: {
        bb: '123'
      }
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/start`,
      data
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: {
        modelInstanceId: '819966',
        modelName: 'qouteModel',
        activeTask: {
          name: 'search'
        },
        previousTask: {
          name: 'uiTasks',
          value: {}
        }
      }
    });

    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.APP_ERROR_CLEAR,
      error: {}
    }, {
      type: types.CG_START,
      workflowData: { quoteModel: { data: { activeTask: { name: 'search' }, modelInstanceId: '819966', modelName: 'qouteModel', previousTask: { name: 'uiTasks', value: {} } } } }
    }];

    return cgActions.startWorkflow(data.modelName, data.data, false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });

  it('should call completeTask thunk', () => {
    const mockAdapter = new MockAdapter(axios);
    const data = {
      workflowId: '819966',
      stepName: 'search',
      data: {

      }
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: {
        modelInstanceId: '819966',
        modelName: 'quoteModel',
        activeTask: {
          name: 'search'
        },
        previousTask: {
          name: 'uiTasks',
          value: {}
        }
      }
    });

    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'quoteModel',
      workflowId: '819966'
    };

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: { quoteModel: { data: { activeTask: { name: 'search' }, modelInstanceId: '819966', modelName: 'quoteModel', previousTask: { name: 'uiTasks', value: {} } } } }
    }];

    return cgActions.completeTask(inputProps.modelName, inputProps.workflowId, 'search', data.data, false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });

  it('should call batchCompleteTask thunk', () => {
    const mockAdapter = new MockAdapter(axios);
    const stepsWithData = [{
      workflowId: '819966',
      name: 'search',
      data: {

      }
    }];

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data: {
        workflowId: stepsWithData[0].workflowId,
        stepName: stepsWithData[0].name,
        data: stepsWithData[0].data
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: {
        modelInstanceId: '819966',
        modelName: 'quoteModel',
        activeTask: {
          name: 'search'
        },
        previousTask: {
          name: 'uiTasks',
          value: {}
        }
      }
    });

    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'quoteModel',
      workflowId: '819966'
    };

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: { quoteModel: { data: { activeTask: { name: 'search' }, modelInstanceId: '819966', modelName: 'quoteModel', previousTask: { name: 'uiTasks', value: {} } } } }
    }];

    return cgActions.batchCompleteTask(inputProps.modelName, inputProps.workflowId, stepsWithData, false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });

  it('should call moveToTask thunk', () => {
    const mockAdapter = new MockAdapter(axios);
    const data = {
      workflowId: '819966',
      name: 'search'
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/moveToTask`,
      data: {
        workflowId: data.workflowId,
        stepName: data.name
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: {
        modelInstanceId: '819966',
        modelName: 'quoteModel',
        activeTask: {
          name: 'search'
        },
        previousTask: {
          name: 'uiTasks',
          value: {}
        }
      }
    });

    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'quoteModel',
      workflowId: '819966'
    };

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: { quoteModel: { data: { activeTask: { name: 'search' }, modelInstanceId: '819966', modelName: 'quoteModel', previousTask: { name: 'uiTasks', value: {} } } } }
    }];

    return cgActions.moveToTask(inputProps.modelName, inputProps.workflowId, 'search', false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });

  it('should call moveToTaskAndExecuteComplete thunk', () => {
    const mockAdapter = new MockAdapter(axios);
    const data = {
      workflowId: '819966',
      name: 'search',
      data: {

      }
    };
    const data2 = {
      workflowId: '819966',
      stepName: 'search',
      data: {

      }
    };
    const completeData = {
      workflowId: '819966',
      stepName: 'search',
      data: {

      }
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/moveToTask`,
      data: {
        workflowId: data.workflowId,
        stepName: data.name
      }
    };
    const axiosOptions2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete`,
      data: data2
    };
    mockAdapter
      .onPost(axiosOptions.url, axiosOptions.data).reply(200, {
        data: {
          modelInstanceId: '819966',
          modelName: 'quoteModel',
          activeTask: {
            name: 'search'
          },
          previousTask: {
            name: 'uiTasks',
            value: {}
          }
        }
      })
      .onPost(axiosOptions2.url, axiosOptions2.data).reply(200, {
        data: {
          modelInstanceId: '819966',
          modelName: 'quoteModel',
          activeTask: {
            name: 'search'
          },
          previousTask: {
            name: 'uiTasks',
            value: {}
          }
        }
      });

    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'quoteModel',
      workflowId: '819966'
    };

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: { quoteModel: { data: { activeTask: { name: 'search' }, modelInstanceId: '819966', modelName: 'quoteModel', previousTask: { name: 'uiTasks', value: {} } } } }
    }];

    return cgActions.moveToTaskAndExecuteComplete(inputProps.modelName, inputProps.workflowId, 'search', completeData, false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });

  it('should call start thunk with error', () => {
    const mockAdapter = new MockAdapter(axios);
    const data = {
      workflowId: '819966',
      name: 'search'
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/moveToTask`,
      data: {
        workflowId: data.workflowId,
        stepName: data.name
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(400, {
      error: 'there is a problem'
    });

    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'quoteModel',
      workflowId: '819966'
    };

    const stateObj = [{
      type: types.APP_ERROR,
      error: { message: 'Request failed with status code 400' }
    }];

    return cgActions.moveToTask(inputProps.modelName, inputProps.workflowId, 'search', false)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });
  });
});

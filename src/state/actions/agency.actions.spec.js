import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as serviceRunner from '../../utilities/serviceRunner';
import mockAgency from '../../modules/Agency/mockAgency';

import * as agencyActions from './agency.actions';
import * as types from './actionTypes';

describe('Test Agency Actions', () => {
  const mockStore = configureStore([]);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('should call setAgencies', () => {
    const agencies = [{ id: '1234' }, { id: '4321' }];

    const stateObj = [{
      type: types.SET_AGENCIES,
      agencies
    }];

    store.dispatch(agencyActions.setAgencies(agencies));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call setAgency', () => {
    const agency = { id: '1234' };

    const stateObj = [{
      type: types.SET_AGENCY,
      agency
    }];

    store.dispatch(agencyActions.setAgency(agency));

    expect(store.getActions()).toEqual(stateObj);
  });


  it('should call set agents', () => {
    const agents = [{ id: '1234' }, { id: '4321' }];

    const stateObj = [{
      type: types.SET_AGENTS,
      agents
    }];

    store.dispatch(agencyActions.setAgents(agents));

    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test agency actions async actions', () => {
    // create sandbox for stubs/mocks/spies
    const sandbox = sinon.sandbox.create();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let initialState;
    let store;
    let httpStub;


    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      httpStub = sinon.stub();
      sandbox.stub(serviceRunner, 'callService').callsFake((...args) => httpStub(...args));
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

    it('Should call dispatch on getAgencies', async () => {
      const companyCode = 'HCI';
      const state = 'FL';
      const agencies = [{ id: '1234' }, { id: '4321' }];

      const stateObj = [{
        type: types.SET_AGENCIES,
        agencies
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agencies } }));

      await store.dispatch(agencyActions.getAgencies(companyCode, state));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('Should call dispatch on getAgency', async () => {
      const agency = [{ agencyCode: '1234' }];

      const stateObj = [{
        type: types.SET_AGENCY,
        agency: agency[0]
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agency[0] } }));
      await store.dispatch(agencyActions.getAgency('1234'));
      expect(store.getActions()).toEqual(stateObj);
    });


    it('Should call dispatch on getAgentsByAgencyCode', async () => {
      const agents = [{ agentCode: '1234' }];

      const stateObj = [{
        type: types.SET_AGENTS,
        agents
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agents } }));
      await store.dispatch(agencyActions.getAgentsByAgencyCode('1234'));
      expect(store.getActions()).toEqual(stateObj);
    });

    it('Should call dispatch on addAgent', async () => {
      const agent = { agentCode: '1234' };
      await store.dispatch(agencyActions.addAgent(agent));
    });

    it('Should call dispatch on addAgent', async () => {
      const agency = { agencyCode: '1234' };
      await store.dispatch(agencyActions.updateAgency(agency));
    });

    it('Should call dispatch on createBranch', async () => {
      const agency = [{ agencyCode: '1234' }];
      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agency[0] } }));
      await store.dispatch(agencyActions.createBranch(mockAgency, mockAgency.agencyCode));
    });
  });

  it('should call createAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?saveNewAgency`,
      data: {
        service: 'agency',
        method: 'POST',
        path: 'agencies',
        data: mockAgency
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    agencyActions.createAgency(store.dispatch);

    return agencyActions.createAgency(mockAgency)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SET_AGENCY);
      });
  });

  it('should fail call for createAgency', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'POST',
        path: 'agencies',
        data: mockAgency
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    agencyActions.createAgency(store.dispatch);

    return agencyActions.createAgency(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should fail call for createBranch', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'POST',
        path: `agencies/${mockAgency.agencyCode}/branches`,
        data: mockAgency
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    agencyActions.createBranch(store.dispatch);

    return agencyActions.createBranch(null)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });


  it('should call getListOfOrphanedAgents', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?fetchOrphanedAgents`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'agents?type=orphaned'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    agencyActions.getListOfOrphanedAgents(store.dispatch);

    return agencyActions.getListOfOrphanedAgents()(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SET_ORPHANED_AGENTS);
      });
  });

  it('should fail updateAgent', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'agency',
        method: 'PUT',
        path: 'agents/123',
        data: { agentCode: 123, agencies: [] }
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    return agencyActions.updateAgent({ agentCode: 123, agencies: [] }, mockAgency.ag)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });


  it('should call getAgentList', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?fetchAgentList`,
      data: {
        service: 'agency',
        method: 'GET',
        path: 'v1/agents/TTIC/FL'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });
    agencyActions.getAgentList(store.dispatch);

    return agencyActions.getAgentList('TTIC', 'FL')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SET_AGENTS_LIST);
      });
  });
});


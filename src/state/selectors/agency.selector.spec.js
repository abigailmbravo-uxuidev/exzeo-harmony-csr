import mockAgency from '../../modules/Agency/mockAgency';

import { getEditModalInitialValues,
  getAgentsList,
  getAgentOfRecord,
  getBranchesList,
  getBranchInitialValues
} from './agency.selector';

describe('Testing Agency Selectors', () => {
  it('should test getEditModalInitialValues', () => {
    const state = {
      agencyState: {
        agency: mockAgency
      }
    };
    const result = getEditModalInitialValues(state, 1);
    expect(result.sameAsMailing).toEqual(true);
  });

  it('should test getEditModalInitialValues without agency', () => {
    const state = {
      agencyState: {
        agency: null
      }
    };
    const result = getEditModalInitialValues(state);
    expect(result).toEqual({});
  });

  it('should test getListOfAgents', () => {
    const state = {
      agencyState: {
        agents: [{
          agentCode: 234, displayText: 'TestFirst TestLast', firstName: 'TestFirst', lastName: 'TestLast'
        }]
      }
    };
    const result = getAgentsList(state);
    const res = [{
      agentCode: 234, displayText: 'TestFirst TestLast', firstName: 'TestFirst', lastName: 'TestLast'
    }];
    expect(result).toEqual(res);
  });

  it('should test getListOfAgents without agent', () => {
    const state = {
      agencyState: {
        agents: null
      }
    };
    const result = getAgentsList(state);
    expect(result).toEqual([]);
  });

  it('should test empty getAgentOfRecord', () => {
    const state = {
      agencyState: {
        agents: null
      }
    };
    const result = getAgentOfRecord(state);
    expect(result).toEqual({});
  });

  it('should test getAgentOfRecord', () => {
    const state = {
      agencyState: {
        agents: [{ agentCode: '123', agencies: [{ agencyCode: '1234' }] }],
        agency: { agencyCode: '1234' }
      }
    };
    const result = getAgentOfRecord(state);
    expect(result).toEqual({});
  });

  it('should test getBranchesList', () => {
    const state = {
      agencyState: {
        agency: { agencyCode: '1234', branches: [{ branchCode: '1', displayName: 'Test' }] }
      }
    };
    const result = getBranchesList(state);
    expect(result).toEqual([{ answer: '1', label: '1: Test' }]);
  });

  it('should test getBranchInitialValues', () => {
    const state = {
      agencyState: {
        agency: mockAgency
      }
    };
    const result = getBranchInitialValues(state);
    expect(result).toEqual({
      contact: {
        emailAddress: 'test@typtap.com',
        firstName: 'A',
        lastName: 'BROCKUS',
        title: 'officer'
      },
      mailingAddress: {
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        careOf: null,
        city: 'LARGO',
        country: {
          code: 'USA',
          displayText: 'United States of America'
        },
        state: 'FL',
        zip: '32258'
      },
      physicalAddress: {
        address1: '2955 EAST BAY DR',
        address2: 'UNIT D',
        city: 'LARGO',
        county: 'DUVAL',
        state: 'FL',
        zip: '32258'
      },
      territoryManagerId: '5b7db9f6ff54fd6a5c619eec'
    });
  });
});


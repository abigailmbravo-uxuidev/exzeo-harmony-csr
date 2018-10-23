import mockAgency from '../../modules/Agency/mockAgency';

import { getEditModalInitialValues, getAgentsList, getAgencyLicenseArray } from './agency.selector';

describe('Testing getEditModalInitialValues', () => {
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
});

describe('Testing getListOfAgents', () => {
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
});


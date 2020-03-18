import { mockAgency } from '../../test-utils/fixtures/agency';
import { mockAgencies } from '../../test-utils/fixtures/agencies';
import { mockAgents } from 'test-utils';

import {
  getEditModalInitialValues,
  getAgentsList,
  getAgentOfRecord,
  getBranchesList,
  getBranchInitialValues,
  filterAgencies,
  filterAgents
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
        agents: [
          {
            agentCode: 234,
            displayText: 'TestFirst TestLast',
            firstName: 'TestFirst',
            lastName: 'TestLast'
          }
        ]
      }
    };
    const result = getAgentsList(state);
    const res = [
      {
        agentCode: 234,
        displayText: 'TestFirst TestLast',
        firstName: 'TestFirst',
        lastName: 'TestLast'
      }
    ];
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
        agency: {
          agencyCode: '1234',
          branches: [
            { branchCode: '2', displayName: 'Test 2' },
            { branchCode: '3', displayName: 'Test 3' },
            { branchCode: '1', displayName: 'Test 1' }
          ]
        }
      }
    };
    const result = getBranchesList(state);
    expect(result).toEqual([
      { answer: '1', branchCode: 1, label: '1: Test 1' },
      { answer: '2', branchCode: 2, label: '2: Test 2' },
      { answer: '3', branchCode: 3, label: '3: Test 3' }
    ]);
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

  it('should test filterAgencies for TTIC, FL, AF3', () => {
    const result = filterAgencies(mockAgencies, [
      { state: 'FL', companyCode: 'TTIC', product: 'AF3' }
    ]);
    expect(result).toEqual([
      {
        answer: 20532,
        label: '20532: 1ST ADVANTAGE INSURANCE INC'
      },
      {
        answer: 20414,
        label: '20414: 1ST BROWARD SERVICE AGENCY LLC'
      }
    ]);
  });

  it('should test filterAgencies for TTIC, FL, HO3', () => {
    const result = filterAgencies(mockAgencies, [
      { state: 'FL', companyCode: 'TTIC', product: 'HO3' }
    ]);
    expect(result).toEqual([
      {
        answer: 20532,
        label: '20532: 1ST ADVANTAGE INSURANCE INC'
      }
    ]);
  });

  it('should test filterAgencies for multiple CSP', () => {
    const result = filterAgencies(mockAgencies, [
      { state: 'FL', companyCode: 'TTIC', product: 'HO3' },
      { companyCode: 'TTIC', state: 'AK', product: 'AF3' },
      { companyCode: 'TTIC', state: 'AL', product: 'HO3' },
      { companyCode: 'TTIC', state: 'AR', product: 'HO3' },
      { companyCode: 'TTIC', state: 'AZ', product: 'HO3' }
    ]);
    expect(result).toEqual([
      {
        answer: 20532,
        label: '20532: 1ST ADVANTAGE INSURANCE INC'
      }
    ]);
  });

  it('should not return results if an agency does not match all specified csp objects', () => {
    const result = filterAgencies(mockAgencies, [
      { state: 'FL', companyCode: 'TTIC', product: 'HO3' },
      { state: 'NM', companyCode: 'TTIC', product: 'AF3' }
    ]);
    expect(result).toEqual([]);
  });

  it('should filter agents by apointed', () => {
    const result = filterAgents(mockAgents, [{ state: 'FL' }]);
    expect(result).toEqual([
      {
        answer: 60562,
        label: '60562: Test Agent'
      }
    ]);
  });

  it('should not return agents who are not appointed ', () => {
    const result = filterAgents(mockAgents, [{ state: 'GA' }]);
    expect(result).toEqual([]);
  });
});

import { getEditModalInitialValues, getListOfAgents, getAgencyLicenseArray } from './agency.selector';
import mockAgency from '../../modules/Agency/mockAgency';

describe('Testing getEditModalInitialValues', () => {
  it('should test getEditModalInitialValues', () => {
    const state = {
      agencyState: {
        agency: mockAgency
      }
    };
    const result = getEditModalInitialValues(state);
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
        agents: [
          {
            firstName: 'TestFirst',
            lastName: 'TestLast',
            agentCode: 234
          }
        ]
      }
    };
    const result = getListOfAgents(state);
    const res = [{ answer: 234, label: 'TestFirst TestLast' }];
    expect(result).toEqual(res);
  });

  it('should test getListOfAgents without agent', () => {
    const state = {
      agencyState: {
        agents: null
      }
    };
    const result = getListOfAgents(state);
    expect(result).toEqual([]);
  });
});

describe('Testing agencyLicenseArray', () => {
  it('should test agencyLicenseArray', () => {
    const state = {
      agencyState: {
        agency: {
          license: [{
            licenseNumber: 60562,
            firstName: 'AGNES',
            lastName: 'BROCKUS'
          }]
        }
      }
    };
    const result = getAgencyLicenseArray(state);
    const res = [60562];
    expect(result).toEqual(res);
  });
});


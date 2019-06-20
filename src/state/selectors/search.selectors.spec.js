import { getAgenciesForTypeAhead } from './search.selectors';

describe('Test Search selectors', () => {
  describe('test getAgenciesForTypeAhead', () => {
    it('should return an empty array when there are no agencies', () => {
      const state = {
        service: {}
      };

      const result = getAgenciesForTypeAhead(state);
      expect(result).toEqual([]);
    });

    it('should return a properly formatted list of agencies', () => {
      const testAgency = {
        displayName: 'test',
        agencyCode: 1234
      };
      const state = {
        service: {
          agencies: [{ ...testAgency }]
        }
      };

      const result = getAgenciesForTypeAhead(state);
      const option = result[0];
      expect(option.label).toEqual(testAgency.displayName);
      expect(option.answer).toEqual(testAgency.agencyCode);
    });
  });
});

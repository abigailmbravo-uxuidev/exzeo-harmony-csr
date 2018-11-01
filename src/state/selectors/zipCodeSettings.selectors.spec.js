import { getListOfZipCodes } from './zipCodeSettings.selectors';

describe('Testing ZipCode Settings Selectors', () => {
  it('should test null getEditModalInitialValues', () => {
    const state = {
      zipCodeSettingsState: {
        zipCodeSettings: null
      }
    };
    const result = getListOfZipCodes(state);
    expect(result).toEqual([]);
  });

  it('should test null getEditModalInitialValues', () => {
    const state = {
      zipCodeSettingsState: {
        zipCodeSettings: [{ zip: '33607' }]
      }
    };
    const result = getListOfZipCodes(state);
    expect(result).toEqual([{ answer: '33607', label: '33607' }]);
  });
});

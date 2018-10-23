import * as serviceRunner from '../../utilities/serviceRunner';

import * as types from './actionTypes';
import * as errorActions from './error.actions';
/**
 *
 * @param zipCodeSettings
 * @returns {{state: string, zipCodeSettings: *}}
 */
export function setZipCodeSettings(zipCodeSettings) {
  return {
    type: types.SET_ZIPCODE_SETTINGS,
    zipCodeSettings
  };
}


/**
 *
 * @param zipCodePartial
 * @param state
 * @returns {Function}
 */
export function searchSettingsByCSPAndZip(zipCodePartial, state) {
  return async (dispatch) => {
    try {
      const zipCodes = await fetchZipCodeSettings(zipCodePartial, state);
      dispatch(setZipCodeSettings(zipCodes));
      return zipCodes;
    } catch (error) {
      dispatch(errorActions.setAppError(error));
      return [];
    }
  };
}

function generateSearchSettingsByCSPAndZipQuery(zipCodePartial, state) {
  const query = `{
        searchSettingsByCSPAndZip(companyCode: "TTIC", state: "${state || ''}", product: "HO3", zipCodePartial: "${zipCodePartial || ''}") {
            county
            state
            companyCode
            zip
          }
        }
    `;
  return query;
}

/**
 *
 * @param zipCodePartial
 * @param state
 * @returns {Promise<{}>}
 */
export async function fetchZipCodeSettings(zipCodePartial, state) {
  try {
    const config = {
      service: 'zipcodesettings',
      method: 'GET',
      path: `graphql?query=${generateSearchSettingsByCSPAndZipQuery(zipCodePartial, state)}`
    };
    const response = await serviceRunner.callService(config);
    const result = response.data && response.data.data && response.data.data.searchSettingsByCSPAndZip ? response.data.data.searchSettingsByCSPAndZip : [];
    return result;
  } catch (error) {
    throw error;
  }
}

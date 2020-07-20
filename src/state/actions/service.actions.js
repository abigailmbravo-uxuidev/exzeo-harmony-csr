import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import * as types from './actionTypes';
import * as errorActions from './error.actions';

export const serviceRequest = data => ({
  type: types.SERVICE_REQUEST,
  data
});

export const getZipcodeSettings = (
  companyCode,
  state,
  product,
  zip,
  propertyId
) => async dispatch => {
  const config = {
    exchangeName: 'harmony.crud',
    routingKey: 'harmony.crud.zipcode-data.getZipCode',
    data: {
      companyCode,
      state,
      product,
      zip,
      propertyId
    }
  };

  try {
    const response = await serviceRunner.callService(
      config,
      'getZipcodeSettings'
    );

    const data = {
      getZipcodeSettings:
        response.data && response.data.result
          ? response.data.result
          : { timezone: '' }
    };
    return dispatch(serviceRequest(data));
  } catch (error) {
    return dispatch(errorActions.setAppError(error));
  }
};

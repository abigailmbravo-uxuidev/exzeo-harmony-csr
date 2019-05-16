import { http } from '@exzeo/core-ui/src/Utilities';

import handleError from './handleError';

/**
 *
 * @param data
 * @param qs
 * @returns {Promise<void>}
 */
export async function callService(data, qs) {
  const param = qs ? `?${qs}` : '';
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/svc${param}`,
    data
  };

  try {
    const response = await http(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 *
 * @param data
 * @returns {Promise<void>}
 */
export async function callQuestions(data) {
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/questions`,
    data
  };

  try {
    const response = await http(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}

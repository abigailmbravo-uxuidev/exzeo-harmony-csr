import axios from 'axios';
import handleError from './handleError';

export async function callService(data) {
  const axiosConfig = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/svc`,
    headers: { 'Content-Type': 'application/json' },
    data
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}

export async function callQuestions(data) {
  const axiosConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: `${process.env.REACT_APP_API_URL}/questions`,
    data
  };

  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    throw handleError(error);
  }
}

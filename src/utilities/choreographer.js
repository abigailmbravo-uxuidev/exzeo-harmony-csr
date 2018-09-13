

import axios from 'axios';

import handleError from './handleError';

export const startWorflow = async (modelName, data) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      modelName,
      data
    },
    url: `${process.env.REACT_APP_API_URL}/cg/start`
  };

  try {
    const result = await axios(axiosConfig);
    return result.data.data.previousTask.value.result;
  } catch (error) {
    throw handleError(error);
  }
};

export default { startWorflow };

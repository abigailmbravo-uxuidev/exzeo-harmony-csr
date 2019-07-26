import { http } from '@exzeo/core-ui/src';
import { formatError } from '@exzeo/core-ui/src/@Harmony';

export const startWorkflow = async ({ modelName, data }) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      modelName,
      data
    },
    url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`
  };

  try {
    const result = await http(axiosConfig);
    return result.data.data;
  } catch (error) {
    throw formatError(error);
  }
};

export const completeTask = async ({ workflowId, stepName, data }) => {
  const axiosConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    url: `${process.env.REACT_APP_API_URL}/cg/complete`,
    data: {
      workflowId,
      stepName,
      data
    }
  };

  try {
    const result = await http(axiosConfig);
    return result.data.data.previousTask.value.result;
  } catch (error) {
    throw formatError(error);
  }
};

export default { startWorkflow, completeTask };

import { http } from '@exzeo/core-ui/src/Utilities';

function handleError(err) {
  // return default error message if non exists
  if (!err) return { message: 'An error occurred that was not handled properly.' };

  let error = err.response && err.response.data ? err.response.data : err;
  // if error is a string, convert to an object
  if (typeof error === 'string') error = { message: error };
  // format error if needed
  if (!error.message) error.message = 'There was an error.';
  return error;
}

export const startWorkflow = async (modelName, data) => {
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
    return result.data.data.previousTask.value.result;
  } catch (error) {
    throw handleError(error);
  }
};

const formatForShareSubmit = (values, props) => {
  const { quoteData } = props;

  const submitData = {
    quoteId: quoteData._id,
    state: quoteData.state,
    zip: quoteData.property.physicalAddress.zip,
    emailAddress: values.emailAddress,
    toName: values.toName
  };

  return {
    submitData,
    modelName: 'csrEmailQuoteSummary',
    pageName: 'summary'
  }
};

const formatForApplicationSubmit = (values, props) => {
  const { quoteData } = props;

  const submitData = {
    dsUrl: `${process.env.REACT_APP_API_URL}/ds`,
    quoteId: quoteData._id
  };

  return {
    submitData,
    modelName: 'csrSubmitApplication',
    pageName: 'application'
  }
};

export const formatForSubmit = (values, page, props) => {
  if (page === 'summary') return formatForShareSubmit(values, props);
  if (page === 'application') return formatForApplicationSubmit(values, props);

  return { submitData: values };

};

export default { startWorkflow , formatForSubmit };

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const jestResolve = (result = {}, error) =>
  jest.fn(() => (error ? Promise.reject(result) : Promise.resolve(result)));

export const jestResolveArray = (results = []) => {
  const jestFunc = jest.fn();
  results.forEach(r => {
    jestFunc.mockReturnValueOnce(
      r.error ? Promise.reject(r) : Promise.resolve(r)
    );
  });
  return jestFunc;
};

export const mockServiceRunner = (result, error) => {
  // spread result in case 'result' is not expected key
  serviceRunner.callService = jestResolve(
    { data: { result, ...result } },
    error
  );
};

export const mockServiceRunnerMultiple = result => {
  serviceRunner.callService = jestResolveArray(result);
};

export const mockQuestions = (result, error) => {
  serviceRunner.callQuestions = jestResolve({ data: { result } }, error);
};

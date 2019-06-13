import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const jestResolve = (result, error) => jest.fn(() => error ?
  Promise.reject(result) : Promise.resolve(result));

export const mockServiceRunner = (result, error) => {
  serviceRunner.callService = jestResolve({ data: { result }}, error);
};

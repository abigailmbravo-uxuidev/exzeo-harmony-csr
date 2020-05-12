import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { jestResolve } from '.';

export default (result, error) => {
  // spread result in case 'result' is not expected key
  serviceRunner.callService = jestResolve(
    { data: { result, ...result } },
    error
  );
};

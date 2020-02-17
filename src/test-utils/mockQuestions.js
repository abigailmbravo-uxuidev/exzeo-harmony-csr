import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { jestResolve } from '.';

export default (result, error) => {
  serviceRunner.callQuestions = jestResolve({ data: { result } }, error);
};

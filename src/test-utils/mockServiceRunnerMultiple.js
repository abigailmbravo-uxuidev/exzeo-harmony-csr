import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import { jestResolveArray } from '.';

export default result => {
  serviceRunner.callService = jestResolveArray(result);
};

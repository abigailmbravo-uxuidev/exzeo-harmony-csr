import React from 'react';
import { shallow } from 'enzyme';

import DeleteContractModal from './DeleteContractModal';

describe('Testing DeleteContractModal component', () => {
  it('should render', () => {
    const props = {
        contracts: {
          stateProducts: [
            {
              state: 'AR',
              product: 'HO3'
            }
          ],
          companyCode: 'TTIC',
          contractNumber: 'TT FL 03 16',
          addendum: 'TT 02 18'
        },
        handleSubmit() {},
        handleOnSubmit() {},
        handleCancel() {}
    };
    const wrapper = shallow(<DeleteContractModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});

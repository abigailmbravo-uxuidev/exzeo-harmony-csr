import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import DeleteContractModal from './DeleteContractModal';

describe('Testing DeleteContractModal component', () => {

  const mockStore = configureStore([]);
  const store = mockStore({});

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
    const wrapper = mount(<DeleteContractModal store={store} {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});

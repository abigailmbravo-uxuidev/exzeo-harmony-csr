import React from 'react';
import { shallow } from 'enzyme';

import TransferModal from './TransferModal';

describe('Testing Transfer Modal', () => {
  it('should render Transfer Modal', () => {
    const props = {

    };
    const wrapper = shallow(<TransferModal {...props} />);
    expect(wrapper).toBeTruthy();
    const wi = wrapper.instance();
  });
});

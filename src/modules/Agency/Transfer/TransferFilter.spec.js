import React from 'react';
import { shallow } from 'enzyme';

import { TransferFilter } from './TransferFilter';
import mockAgency from '../mockAgency';

describe('Testing TransferFilter', () => {
  it('should render TransferFilter', () => {
    const props = {
        listAnswersAsKey: {
            Products: [{ answer: 'HO3', label: 'HO3'}],
            US_states : [{ answer: 'FL', label: 'FL'}]
        }
    };
    const wrapper = shallow(<TransferFilter {...props} />);
    expect(wrapper).toBeTruthy();
  });
});

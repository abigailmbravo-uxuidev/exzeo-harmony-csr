import React from 'react';
import { shallow } from 'enzyme';

import { Transfer } from './Transfer';

describe('Testing Transfer', () => {
  it('should render Transfer', () => {
    const props = {
        agency: {},
        agentsList: [],
        policies: [],
        policyNumberList: [],
        listAnswersAsKey: [],
        getPoliciesForAgency(){}
    };
    const wrapper = shallow(<Transfer {...props} />);
    expect(wrapper).toBeTruthy();
  });
});

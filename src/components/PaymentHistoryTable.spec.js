import React from 'react';
import { shallow } from 'enzyme';
import PaymentHistoryTable from './PaymentHistoryTable';

describe('Test the PaymentHistoryTable Component', () => {
  it('Should Render PaymentHistoryTable', () => {
    const wrapper = shallow(<PaymentHistoryTable paymentHistory={[]} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});

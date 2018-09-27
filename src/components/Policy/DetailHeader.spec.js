import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';

import ConnectedApp, { DetailHeader, showEffectiveDatePopUp, showReinstatePolicyPopUp } from './DetailHeader';

describe('Testing DetailHeader component', () => {
  const props = {
    policy: {
      policyID: '234',
      product: 'HO3',
      status: 'Pending Cancellation',
      endDate: '2018-12-12',
      property: {
        physicalAddress: {
          address1: 'test',
          address2: '',
          city: 'Tampa',
          state: 'FL',
          zip: '33606'
        }
      }
    },
    summaryLedger: {
      status: { code: 99 }
    },
    setAppState() {},
    getEffectiveDateChangeReasons() {},
    fieldQuestions: [],
    quoteData: {},
    appState: {
      data: {
        submitting: false
      }
    },
    policyDetails: { cancellation: {} }
  };

  it('should test app', () => {
    const wrapper = shallow(<DetailHeader {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
    wrapper.find('button#effective-date').simulate('click');

    showEffectiveDatePopUp(props);
    showReinstatePolicyPopUp(props);
  });

  it('should test connected app', () => {
    const initialState = {
      service: {},
      appState: {
        modelName: 'bb',
        data: {}
      },
      policyState: {}
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore(initialState);

    const wrapper = shallow(<ConnectedApp store={store} {...props} />);

    expect(wrapper.dive());
  });

  describe('should Test Expiration / Cancelation Date Logic', () => {
    it('should display Expiration Date when Policy Status is In Force and Billing Status is No Payment Received', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is No Payment Received', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is No Payment Received', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is In Force and Billing Status is Full Payment Received', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is In Force and Billing Status is Over Payment Received', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });
    it('should display Expiration Date when Policy Status is In Force and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });
    it('should display Expiration Date when Policy Status is In Force and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });
    it('should display Expiration Date when Policy Status is In Force and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is In Force and Billing Status is Policy Expired', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 99;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Policy Issued and Billing Status is Policy Expired', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 99;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Expiration Date when Policy Status is Not In Force and Billing Status is Policy Expired', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 99;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Expiration Date');
    });

    it('should display Cancelation Date when Policy Status is In Force and Billing Status is Non-Payment Notice Issued', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 9;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is Non-Payment Notice Issued', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 9;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is Non-Payment Notice Issued', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 9;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is Non-Payment Notice Issued', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 9;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is Non-Payment Notice Issued', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 9;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is No Payment Received', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is No Payment Received', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is No Payment Received', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is No Payment Received', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 0;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is Full Payment Received', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 1;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is Over Payment Received', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 2;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 3;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Cancelled and Billing Status is Partial Payment Received', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Voluntary Cancellation and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Pending Voluntary Cancellation';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });

    it('should display Cancelation Date when Policy Status is Pending Underwriting Cancellation and Billing Status is Partial PaymenPayment Invoice Issued', () => {
      props.policy.status = 'Pending Underwriting Cancellation';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
    it('should display Cancelation Date when Policy Status is Pending Underwriting Non-Renewal and Billing Status is Payment Invoice Issued', () => {
      props.policy.status = 'Pending Underwriting Non-Renewal';
      props.summaryLedger.status.code = 6;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('#cancellationDateLabel').text()).toEqual('Cancellation Date');
    });
  });

  describe('should test reinstatement logic', () => {
    it('should display reinsatement button Policy Canceled and Billing Status is Voluntary Cancellation', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 12;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(1);
    });
    it('should display reinsatement button Policy Canceled and Billing Status is Non-Payment Cancellation', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 13;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(1);
    });
    it('should display reinsatement button Policy Canceled and Billing Status is Underwriting Cancellation', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 14;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(1);
    });
    it('should display reinsatement button Policy Canceled and Billing Status is Underwriting Non-Renewal', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 15;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(1);
    });

    it('should not display reinsatement button Policy In Force and Billing Status is Voluntary Cancellation', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 12;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Non-Payment Cancellation', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 13;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Underwriting Cancellation', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 14;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Underwriting Non-Renewal', () => {
      props.policy.status = 'In Force';
      props.summaryLedger.status.code = 15;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });

    it('should not display reinsatement button Policy In Force and Billing Status is Voluntary Cancellation', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 12;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Non-Payment Cancellation', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 13;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Underwriting Cancellation', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 14;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy In Force and Billing Status is Underwriting Non-Renewal', () => {
      props.policy.status = 'Not In Force';
      props.summaryLedger.status.code = 15;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });

    it('should not display reinsatement button Policy Issued and Billing Status is Voluntary Cancellation', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 12;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy Issued and Billing Status is Non-Payment Cancellation', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 13;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy Issued and Billing Status is Underwriting Cancellation', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 14;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('should not display reinsatement button Policy Issued and Billing Status is Underwriting Non-Renewal', () => {
      props.policy.status = 'Policy Issued';
      props.summaryLedger.status.code = 15;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(0);
    });
    it('simulate showReinstatePolicyPopUp click', () => {
      props.policy.status = 'Cancelled';
      props.summaryLedger.status.code = 12;
      const wrapper = shallow(<DetailHeader {...props} />);
      expect(wrapper.find('button#show-reinstate').length).toEqual(1);
      wrapper.find('button#show-reinstate').simulate('click');
    });
  });
});

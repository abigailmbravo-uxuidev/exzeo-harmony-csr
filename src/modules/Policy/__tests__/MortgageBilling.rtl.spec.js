import React from 'react';

import {
  render,
  defaultPolicyWorkflowProps,
  mockServiceRunner,
  mockQuestions,
  defaultAuth
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

describe('Policy: Mortgage / Billing page testing', () => {
  mockServiceRunner({ paymentOptions: [] });
  mockQuestions({});

  const props = {
    ...defaultPolicyWorkflowProps,
    match: {
      params: { policyNumber: '12-345-67' },
      path: '/policy/:policyNumber/billing'
    },
    location: {
      pathname: '/policy/12-345-67/billing'
    },
    policyFormData: defaultPolicyWorkflowProps.policy,
    userProfile: {
      resources: [{ uri: 'TTIC:FL:HO3:OnlinePayments:*', right: 'INSERT' }]
    }
  };

  describe('Test Online Payments section', () => {
    it('Online Payments enabled with correct resources', async () => {
      const { queryByText } = render(<PolicyWorkflow {...props} />);

      expect(queryByText(/make electronic payment/i)).not.toBeInTheDocument();
    });

    it('Has disabled online payments for correct policy statuses', async () => {
      const onlinePaymentResource = {
        uri: 'TTIC:FL:HO3:OnlinePayments:*',
        right: 'INSERT'
      };
      const auth = {
        ...defaultAuth,
        userProfile: {
          ...defaultAuth.userProfile,
          resources: [
            ...defaultAuth.userProfile.resources,
            onlinePaymentResource
          ]
        }
      };

      const { getByText } = render(<PolicyWorkflow {...props} />, { auth });

      expect(getByText(/make electronic payment/i)).toBeInTheDocument();
    });
  });
});

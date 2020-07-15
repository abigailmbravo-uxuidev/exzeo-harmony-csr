import React from 'react';

import {
  renderWithForm,
  defaultPolicyWorkflowProps,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

describe('Policy: Mortgage / Billing page testing', () => {
  mockServiceRunner({ paymentOptions: [] });
  mockQuestions({});

  const baseProps = {
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
    it('Has enabled online payments for correct policy statuses', async () => {
      const props = {
        ...baseProps,
        policyFormData: { ...baseProps.policyFormData, status: 'Policy Issued' }
      };

      const { getByText } = renderWithForm(<PolicyWorkflow {...props} />);

      expect(getByText(/make electronic payment/i)).not.toBeDisabled();
    });

    it('Has disabled online payments for correct policy statuses', async () => {
      const props = {
        ...baseProps,
        policyFormData: {
          ...baseProps.policyFormData,
          status: 'No take payment'
        }
      };

      const { getByText } = renderWithForm(<PolicyWorkflow {...props} />);

      expect(getByText(/make electronic payment/i)).toBeDisabled();
    });
  });
});

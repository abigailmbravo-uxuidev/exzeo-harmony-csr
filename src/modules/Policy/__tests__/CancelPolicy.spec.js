import React from 'react';
import { waitForElement, fireEvent, wait } from '@testing-library/react';
import { date } from '@exzeo/core-ui';

import { getPaymentHistory } from '../../../state/actions/policy.actions';
import {
  renderWithForm,
  defaultPolicyWorkflowProps,
  mockServiceRunner
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

mockServiceRunner([]);

describe('CancelType Testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    match: {
      params: { policyNumber: '12-345-67' },
      path: '/policy/:policyNumber/cancel'
    },
    location: {
      pathname: '/policy/12-345-67/cancel'
    },
    policyFormData: defaultPolicyWorkflowProps.policy
  };
  const now = date.convertDateToTimeZone(undefined, {
    timezone: 'America/New_York'
  });

  describe('Test Underwriting Cancellation Date', () => {
    it('HO3, Term 1, today’s date is greater than the effective date', async () => {
      const effectiveDate = now.clone().subtract(10, 'd');
      props.policy.product = 'HO3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 20
      const inputValue = now
        .clone()
        .add(20, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('HO3, Term 1, policy effective date is greater than today’s date', async () => {
      const effectiveDate = now.clone().add(10, 'd');
      props.policy.product = 'HO3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be effectiveDate + 20
      const inputValue = effectiveDate
        .clone()
        .add(20, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('HO3, Term 1, Today’s Date > first 90 days of the Policy Effective Date', async () => {
      const effectiveDate = now.clone().subtract(100, 'd');
      props.policy.product = 'HO3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 20
      const inputValue = now
        .clone()
        .add(120, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('HO3, Term 2, Today’s Date <= first 90 days of the Policy Effective Date', async () => {
      const effectiveDate = now.clone().add(30, 'd');
      props.policy.product = 'HO3';
      props.policy.policyTerm = 2;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 120
      const inputValue = now
        .clone()
        .add(120, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('AF3, Term 1, Today’s Date <= first 90 days of the Policy Effective Date', async () => {
      const effectiveDate = now.clone().add(30, 'd');
      props.policy.product = 'AF3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be effectiveDate + 45
      const inputValue = effectiveDate
        .clone()
        .add(45, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('AF3, Term 1, Today’s Date > than Policy Effective Date and less than 90', async () => {
      const effectiveDate = now.clone().subtract(70, 'd');
      props.policy.product = 'AF3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 45
      const inputValue = now
        .clone()
        .add(45, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('AF3, Term 1, Today’s Date > first 90 days of the Policy Effective Date', async () => {
      const effectiveDate = now.clone().subtract(100, 'd');
      props.policy.product = 'AF3';
      props.policy.policyTerm = 1;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 120
      const inputValue = now
        .clone()
        .add(120, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });

    it('AF3, Term 2, Today’s Date <= first 90 days of the Policy Effective Date', async () => {
      const effectiveDate = now.clone().add(30, 'd');
      props.policy.product = 'AF3';
      props.policy.policyTerm = 2;
      props.policy.summaryLedger.effectiveDate = effectiveDate.format(
        'YYYY-MM-DD'
      );

      //Expect Cancel Date to be today + 120
      const inputValue = now
        .clone()
        .add(120, 'd')
        .format('YYYY-MM-DD');

      const { getByText, getByLabelText } = renderWithForm(
        <PolicyWorkflow {...props} />
      );

      fireEvent.click(getByText('Underwriting Cancellation'));
      expect(getByLabelText('Effective Date').value).toBe(inputValue);
    });
  });
});

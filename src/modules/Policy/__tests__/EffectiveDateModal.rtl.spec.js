import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import {
  renderWithForm,
  defaultPolicyWorkflowProps,
  mockServiceRunner
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

mockServiceRunner([]);

describe('Change Effective Date Testing', () => {
  const props = {
    effectiveDateReasons: [
      {
        answer: 'HUD Statement/Property Deed',
        label: 'HUD Statement/Property Deed'
      },
      { answer: "Agent's Request", label: "Agent's Request" },
      { answer: 'Internal User Error', label: 'Internal User Error' },
      { answer: 'Other', label: 'Other' }
    ],
    ...defaultPolicyWorkflowProps,
    summaryLedger: {
      currentPremium: 2058
    },
    match: {
      params: { policyNumber: '12-345-67' },
      path: '/policy/:policyNumber/coverage'
    },
    location: {
      pathname: '/policy/12-345-67/coverage'
    },
    policyFormData: defaultPolicyWorkflowProps.policy
  };

  it('open model, test field values, then test reset values on modal close', async () => {
    const { getByText, getByLabelText, getByTestId } = renderWithForm(
      <PolicyWorkflow {...props} />
    );

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('effective-date-change-reason').value).toBe('');
      expect(getByTestId('effective-date-change-reason').options[0].value).toBe(
        ''
      );
      expect(getByTestId('effective-date-change-reason').options[1].value).toBe(
        'HUD Statement/Property Deed'
      );
      expect(getByTestId('effective-date-change-reason').options[2].value).toBe(
        "Agent's Request"
      );
      expect(getByTestId('effective-date-change-reason').options[3].value).toBe(
        'Internal User Error'
      );
      expect(getByTestId('effective-date-change-reason').options[4].value).toBe(
        'Other'
      ); // expect(getByTestId('effective-date-change-reason').value).toBe('');
      expect(getByTestId('effective-date').value).toBe('2019-10-03');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2020-03-03' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    await wait(() => {
      expect(getByTestId('effective-date-change-reason').value).toBe(
        'Internal User Error'
      );
      expect(getByTestId('effective-date').value).toBe('2020-03-03');
    });

    fireEvent.click(getByTestId('modal-cancel'));

    fireEvent.click(getByTestId('edit-effective-date'));

    await wait(() => {
      expect(getByTestId('effective-date-change-reason').value).toBe('');
      expect(getByTestId('effective-date').value).toBe('2019-10-03');
    });
  });

  it('should trigger validation errors for effective date and change reasons', () => {});

  it('should get rate with valid form data and toggle to submit', () => {});

  it('should switch submit button back and clear out rate if form is changed', () => {});

  it('should get rate and save effective date then close modal', () => {});
});

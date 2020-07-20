import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { noop } from '@exzeo/core-ui';

import {
  render,
  defaultPolicyWorkflowProps,
  mockServiceRunner,
  jestResolve
} from '../../../test-utils';

import { PolicyWorkflow } from '../PolicyWorkflow';
import * as data from '../utilities';

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
    policyFormData: defaultPolicyWorkflowProps.policy,
    getPolicy: noop
  };

  it('open model, test field values, then test reset values on modal close', async () => {
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

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

      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
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

  it('should trigger validation errors for effective date and change reasons', async () => {
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId(`effective-date_error`)).toHaveTextContent(
        'Field Required'
      );
      expect(
        getByTestId(`effective-date-change-reason_error`)
      ).toHaveTextContent('Field Required');
    });
  });

  it('should get rate with positive premium change and toggle to submit', async () => {
    data.rateEffectiveDateChange = jestResolve({
      instanceId: '123',
      premiumChange: 55
    });
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-03' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('$55');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,113');
    });
  });

  it('should get rate with negative premium change and toggle to submit', async () => {
    data.rateEffectiveDateChange = jestResolve({
      instanceId: '123',
      premiumChange: -55
    });
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-03' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('-$55');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,003');
    });
  });

  it('should get rate with  no premium change and toggle to submit', async () => {
    data.rateEffectiveDateChange = jestResolve({
      instanceId: '123',
      premiumChange: 0
    });
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-03' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('$0');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,058');
    });
  });

  it('should switch submit button back and clear out rate if form is changed', async () => {
    data.rateEffectiveDateChange = jestResolve({
      instanceId: '123',
      premiumChange: 0
    });
    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
      expect(getByTestId('effective-date').value).toBe('2019-10-03');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-03' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('$0');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,058');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-04' }
    });

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('$0');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,058');
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Other' }
    });

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
    });
  });

  it('should get rate and save effective date', async () => {
    data.rateEffectiveDateChange = jestResolve({
      instanceId: '123',
      premiumChange: 0
    });

    data.saveEffectiveDateChange = jestResolve();

    props.getPolicy = jestResolve({
      policy: {
        ...defaultPolicyWorkflowProps.policy,
        effectiveDate: '2019-03-05'
      },
      summaryLedger: {
        currentPremium: 2058
      }
    });

    const { getByText, getByTestId } = render(<PolicyWorkflow {...props} />);

    fireEvent.click(getByTestId('edit-effective-date'));
    await wait(() => {
      //edit-effective-date
      expect(getByText('Edit Effective Date'));
      expect(getByTestId('modal-submit')).toHaveTextContent(/Review/);
      expect(getByTestId('premiumChange').value).toBe('');
      expect(getByTestId('newAnnualPremium').value).toBe('');
      expect(getByTestId('effective-date').value).toBe('2019-10-03');
    });

    fireEvent.change(getByTestId('effective-date'), {
      target: { value: '2019-03-05' }
    });

    fireEvent.change(getByTestId('effective-date-change-reason'), {
      target: { value: 'Internal User Error' }
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => {
      //edit-effective-date
      expect(getByTestId('modal-submit')).toHaveTextContent(/Update/);
      expect(getByTestId('premiumChange').value).toBe('$0');
      expect(getByTestId('newAnnualPremium').value).toBe('$2,058');
    });

    fireEvent.click(getByTestId('modal-submit'));

    await wait(() => expect(document.querySelector('modal')).toBeNull());
  });
});

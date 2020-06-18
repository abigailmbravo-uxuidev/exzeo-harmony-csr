import React from 'react';
import {
  waitForElement,
  fireEvent,
  wait,
  within
} from '@testing-library/react';

import { renderWithForm, jestResolve } from '../../../test-utils';

import BulkMortgagee from '../@components/BulkMortgagee';
import { noop } from '@exzeo/core-ui';
import * as bulkMortgageData from '../data';
import topMortgagees from '../../../test-utils/fixtures/topMortgagees';
import mockPolicies from '../../../test-utils/fixtures/policiesWithMortgagees';

describe('BulkMortgagee Testing', () => {
  bulkMortgageData.getTopMortgagees = jestResolve(topMortgagees);
  bulkMortgageData.fetchMortgageesFromPolicies = jestResolve(mockPolicies);

  it('Renders BulkMortgagee and check headers / labels', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    await wait(() => {
      // Page Headers
      expect(getByText('Queued For Update'));
      expect(getByText('Bulk Mortgagee'));
      expect(getByText('By Policy'));
      //Mortgagee Form Labels
      expect(getByText('Top Mortgagees'));
      expect(getByText('Clear & Reset Form'));
      expect(getByText('Name 1'));
      expect(getByText('Name 2'));
      expect(getByText('Address 1'));
      expect(getByText('Address 2'));
      expect(getByText('City'));
      expect(getByText('State'));
      expect(getByText('Zip'));
      expect(getByText('Instruction'));
      expect(getByText('Mail Notice'));
      expect(getByText('Suppress Notice'));
      //Policy Search Labels
      const productWrapper = within(getByTestId('product_wrapper'));
      const searchTypeWrapper = within(getByTestId('searchType_wrapper'));
      const policyNumberWrapper = within(getByTestId('policyNumber_wrapper'));

      expect(productWrapper.getByText('Product'));
      expect(searchTypeWrapper.getByText('Search Type'));
      expect(policyNumberWrapper.getByText('Search'));
    });
  });

  it('Fill out Mortgagee Form', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    await waitForElement(() => [getByTestId('mortgage_wrapper')]);

    await wait(() => {
      getByText('Start typing to search...');
      expect(getByTestId('mortgage_wrapper'));
    });

    fireEvent.change(getByTestId('name1'), {
      target: { value: "AMERICA'S SERVICING" }
    });
    fireEvent.change(getByTestId('name2'), {
      target: { value: 'COMPANY, ISAOA' }
    });

    fireEvent.change(getByTestId('mailingAddress.address1'), {
      target: { value: 'PO BOX 5106' }
    });

    fireEvent.change(getByTestId('mailingAddress.city'), {
      target: { value: 'SPRINGFIELD' }
    });

    fireEvent.change(getByTestId('mailingAddress.state'), {
      target: { value: 'OH' }
    });

    fireEvent.change(getByTestId('mailingAddress.zip'), {
      target: { value: '45501' }
    });

    await wait(() => {
      expect(getByTestId('name1').value).toBe("AMERICA'S SERVICING");
      expect(getByTestId('name2').value).toBe('COMPANY, ISAOA');
      expect(getByTestId('mailingAddress.address1').value).toBe('PO BOX 5106');
      expect(getByTestId('mailingAddress.city').value).toBe('SPRINGFIELD');
      expect(getByTestId('mailingAddress.state').value).toBe('OH');
      expect(getByTestId('mailingAddress.zip').value).toBe('45501');
    });
  });

  it('Search Policy', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
    await waitForElement(() => [
      getByTestId('policyNumber'),
      getByTestId('search-policy-submit')
    ]);

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: '12-1019690-01' }
    });

    await wait(() => {
      expect(getByTestId('policyNumber').value).toBe('12-1019690-01');
    });

    fireEvent.click(getByTestId('search-policy-submit'));

    await waitForElement(() => [
      getByTestId('mortgagee-0'),
      getByTestId('mortgagee-1')
    ]);
    const firstMortgageeCard = within(getByTestId('mortgagee-0'));

    expect(firstMortgageeCard.getByText('Mortgagee 1'));
    expect(firstMortgageeCard.getByText('SUNTRUST BANK'));
    expect(firstMortgageeCard.getByText('PO BOX 47047, ATLANTA, GA 30362'));
    expect(firstMortgageeCard.getByText('Current Bill To:'));
    expect(firstMortgageeCard.getByText('Yes'));
    expect(firstMortgageeCard.getByText('12-1008954-01'));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(firstMortgageeCard.getByText('4019 BRAESGATE LN, TAMPA, FL 33624'));
    expect(firstMortgageeCard.getByText('QUEUE'));

    const secondMortgageeCard = within(getByTestId('mortgagee-1'));

    expect(secondMortgageeCard.getByText('Mortgagee 2'));
    expect(secondMortgageeCard.getByText('BANK OF AMERICA'));
    expect(secondMortgageeCard.getByText('PO BOX 22005, TAMPA, FL 33607'));
    expect(secondMortgageeCard.getByText('Make Bill To'));
    expect(secondMortgageeCard.getByText('12-1008954-01'));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(secondMortgageeCard.getByText('4019 BRAESGATE LN, TAMPA, FL 33624'));
    expect(secondMortgageeCard.getByText('QUEUE'));
  });

  it('Queue policy, check Queue card fields, then remove from queue', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
    await waitForElement(() => [
      getByTestId('policyNumber'),
      getByTestId('search-policy-submit')
    ]);

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: '12-1019690-01' }
    });

    await wait(() => {
      expect(getByTestId('policyNumber').value).toBe('12-1019690-01');
    });

    fireEvent.click(getByTestId('search-policy-submit'));
    await waitForElement(() => [
      getByTestId('mortgagee-0'),
      getByTestId('mortgagee-1')
    ]);

    const firstMortgageeCard = within(getByTestId('mortgagee-0'));

    fireEvent.click(firstMortgageeCard.getByText('QUEUE'));

    await wait(() => [
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad'),
      getByText(/1 queued/)
    ]);

    const queuedMortgageeCard = within(
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad')
    );
    expect(queuedMortgageeCard.getByText('HO3'));
    expect(queuedMortgageeCard.getByText(/SUNTRUST BANK/));
    expect(queuedMortgageeCard.getByText('PO BOX 47047, ATLANTA, GA 30362'));
    expect(queuedMortgageeCard.getByText('Bill To:'));
    expect(queuedMortgageeCard.getByText(/Loan Number/));
    expect(queuedMortgageeCard.getByText(/12-1008954-01/));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(queuedMortgageeCard.getByText('Remove'));

    fireEvent.click(queuedMortgageeCard.getByText('Remove'));

    await wait(() => {
      getByText(/0 queued/);
    });
  });
});
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

describe('BulkMortgagee Testing', () => {
  bulkMortgageData.getTopMortgagees = jestResolve(topMortgagees);

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

  it('Search Policy by policyNumber', async () => {});

  it('Search Policy by policyHolder', async () => {});

  it('Search Policy by propertyAddress', async () => {});

  it('Search Policy by flood', async () => {});

  it('Search Policy by HO3', async () => {});

  it('Search Policy No results', async () => {});

  it('Queue policy and remove from queue', async () => {});

  it('Queue multiple policies and Remove all from queue', async () => {});

  it('Check Link on Policy', async () => {});
});

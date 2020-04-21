import React from 'react';
import { waitForElement, fireEvent, wait } from '@testing-library/react';

import { renderWithForm, jestResolve } from '../../../test-utils';

import BulkMortgagee from '../@components/BulkMortgagee';
import { noop } from '@exzeo/core-ui';
import * as bulkMortgageData from '../data';
import topMortgagees from '../../../test-utils/fixtures/topMortgagees';

describe('BulkMortgagee Testing', () => {
  bulkMortgageData.getTopMortgagees = jestResolve(topMortgagees);

  it('POS: Renders BulkMortgagee', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
  });

  it('POS: Fill out Mortgagee Form', async () => {
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
});

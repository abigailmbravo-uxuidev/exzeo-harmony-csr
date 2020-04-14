import React from 'react';
import { waitForElement, fireEvent, wait } from '@testing-library/react';

import { renderWithForm } from '../../../test-utils';

import BulkMortgagee from '../@components/BulkMortgagee';
import { noop } from '@exzeo/core-ui';

describe('BulkMortgagee Testing', () => {
  it('POS: Renders BulkMortgagee', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
  });
});

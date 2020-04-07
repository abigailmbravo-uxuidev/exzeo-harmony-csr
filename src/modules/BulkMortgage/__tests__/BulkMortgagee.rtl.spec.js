import React from 'react';
import { waitForElement, fireEvent, wait } from '@testing-library/react';

import { renderWithForm } from '../../../test-utils';

import BulkMortgagee from '../@components/BulkMortgagee';

describe('BulkMortgagee Testing', () => {
  it('POS: Renders BulkMortgagee', async () => {
    const props = {};
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
  });
});

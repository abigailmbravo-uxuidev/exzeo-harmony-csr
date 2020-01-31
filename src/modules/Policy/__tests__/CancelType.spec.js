import React from 'react';
import { render, fireEvent, waitForElement, wait } from 'react-testing-library';

import CancelType from '../CancelType';

describe('CancelType Testing', () => {
  const props = {
    initialValues: {
      summaryLedger: {
        effectiveDate: '2018-04-23T04:00:00.000Z'
      }
    },
    options: {
      zipCodeSettings: {}
    }
  };

  it('Test ', () => {
    const { getByText } = render(<CancelType {...props} />);

    expect(getByText('Test'));
  });
});

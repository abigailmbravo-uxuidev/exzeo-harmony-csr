import React from 'react';
import {
  fireEvent,
  waitForElement,
  wait,
  findAllByLabelText,
  findAllByPlaceholderText,
  findByLabelText
} from 'react-testing-library';

import {
  defaultCreateAgencyProps,
  renderWithForm,
  mockServiceRunner,
  zipCodeSettings
} from '../../../test-utils';

import AgencySideNav from '../AgencySideNav';

mockServiceRunner([]);

describe('Testing the Agency Side-Nav', () => {
  it('POS:Note Button is disabled while creating an agency', () => {
    const props = {
      agencyCode: 'new',
      match: {
        url: ''
      }
    };
    const { getByTestId } = renderWithForm(<AgencySideNav {...props} />);

    expect(getByTestId('new-note')).toHaveAttribute('disabled');
  });

  it('POS:Note Button is active while an agency is selected', () => {
    const props = {
      agencyCode: '1',
      match: {
        url: ''
      }
    };
    const { getByTestId } = renderWithForm(<AgencySideNav {...props} />);

    expect(getByTestId('new-note')).not.toHaveAttribute('disabled');
  });
});

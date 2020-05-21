import React from 'react';
import { render } from '@testing-library/react';

import EffectiveDateModal from '../EffectiveDateModal';
import { noop } from '@exzeo/core-ui';

describe('EffectiveDateModal testing', () => {
  it('render Effective Date Modal', async () => {
    const props = {
      initialValues: { effectiveDate: '2020-02-02' },
      closeModal: noop,
      effectiveDateReasons: [
        'HUD Statement/Property Deed',
        "Agent's Request",
        'Internal User Error',
        'Other'
      ],
      errorHandler: noop,
      zipCodeSettings: [],
      currentPremium: 2507,
      getPolicy: noop
    };

    const { getByText } = render(<EffectiveDateModal {...props} />);
  });

  it('should reset form values after modifying when closed then opened', () => {});

  it('should trigger validation errors for effective date and change reasons', () => {});

  it('should get rate with valid form data and toggle to submit', () => {});

  it('should switch submit button back and clear out rate if form is changed', () => {});

  it('should get rate and save effective date then close modal', () => {});
});

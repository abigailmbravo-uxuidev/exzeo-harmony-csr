import React from 'react';
import { render } from '@testing-library/react';

import EffectiveDateModal from '../EffectiveDateModal';
import { noop } from '@exzeo/core-ui';

describe('EffectiveDateModal testing', () => {
  it('render', async () => {
    const props = {
      initialValues: { effectiveDate: '2020-02-02' },
      closeModal: noop,
      effectiveDateReasons: {},
      errorHandler: noop,
      zipCodeSettings: [],
      currentPremium: 2507,
      getPolicy: noop
    };

    const { getByText } = render(<EffectiveDateModal {...props} />);
  });
});

import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';

import {
  renderWithForm,
  defaultPolicyWorkflowProps
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

describe('CancelType Testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    match: {
      params: { policyNumber: '12-345-67' },
      path: '/policy/:policyNumber/cancel'
    },
    location: {
      pathname: '/policy/12-345-67/cancel'
    },
    policyFormData: defaultPolicyWorkflowProps.policy,
    zipCodeSettings: {},
    initialized: true
  };

  it('Test ', () => {
    const { getByText } = renderWithForm(<PolicyWorkflow {...props} />);

    expect(getByText('Test'));
  });
});

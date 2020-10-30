import React from 'react';
import * as agencyData from '@exzeo/core-ui/src/@Harmony/Agency/data';

import {
  fireEvent,
  waitForElement,
  wait,
  within,
  defaultQuoteWorkflowProps,
  policyHolder,
  render,
  searchAgenciesResult,
  searchAgentsResult,
  jestResolve,
  checkLabel,
  checkSelect,
  checkTextInput,
  checkStaticField,
  checkRadio,
  clearText,
  checkError,
  checkOutput,
  producedByFields,
  primaryPolicyholderFields,
  secondaryPolicyholderFields,
  propertyFields,
  homeAndLocationFields,
  coverageFields,
  otherCoveragesFields,
  deductiblesFields,
  discountsFields,
  windFields,
  mockServiceRunner
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [
  { text: 'Produced By' },
  { text: 'Primary Policyholder' },
  { text: 'Secondary Policyholder' },
  { text: 'Property Address' },
  { text: 'Home and Location' },
  { text: 'Coverages' },
  { text: 'Other Coverages' },
  { text: 'Deductibles' },
  { text: 'Discounts' },
  { text: 'Wind Mitigation' }
];

mockServiceRunner([]);

describe('Testing the Coverage/Rating Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      agencyCode: 20000,
      agentCode: 60000
    },
    location: { pathname: '/quote/12-345-67/coverage' },
    match: { params: { step: 'coverage' } }
  };

  const allFields = [
    ...producedByFields,
    ...primaryPolicyholderFields,
    ...secondaryPolicyholderFields,
    ...propertyFields,
    ...homeAndLocationFields,
    ...coverageFields,
    ...otherCoveragesFields,
    ...deductiblesFields,
    ...discountsFields,
    ...windFields
  ];

  it('POS:Checks Header and Labels for all fields', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    pageHeaders.forEach(header => expect(getByTextInsideForm(header.text)));
    allFields
      .filter(field => field.visible !== false)
      .forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Produced By Fields Placeholder', async () => {
    agencyData.searchAgencies = jestResolve([]);
    agencyData.fetchAgentsByAgencyCode = jestResolve([]);

    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await wait(() =>
      expect(getByTestId('agencyCode_wrapper').textContent).toMatch(
        /Start typing to search.../
      )
    );
    await wait(() =>
      expect(getByTestId('agentCode_wrapper').textContent).toMatch(
        /Start typing to search.../
      )
    );
  });

  it('POS:Produced By Fields', async () => {
    agencyData.searchAgencies = jestResolve(searchAgenciesResult);
    agencyData.fetchAgentsByAgencyCode = jestResolve(searchAgentsResult);

    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    const agency = getByTestId('agencyCode_wrapper');
    const agent = getByTestId('agentCode_wrapper');
    await waitForElement(() => getByText(/20000: TEST DEFAULT AGENCY/));
    expect(getByText(/60000: Peregrin Took/));

    fireEvent.keyDown(agency.querySelector('input:not([type="hidden"])'), {
      keyCode: 40
    });
    await waitForElement(() => getByText(/123: TEST NEW AGENCY/));
    fireEvent.click(getByText(/123: TEST NEW AGENCY/));

    fireEvent.keyDown(agent.querySelector('input:not([type="hidden"])'), {
      keyCode: 40
    });
    await waitForElement(() => getByText(/999: Meriadoc Brandybuck/));
    fireEvent.click(getByText(/999: Meriadoc Brandybuck/));
  });

  it('POS:PolicyHolder Fields', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    [
      ...primaryPolicyholderFields,
      ...secondaryPolicyholderFields
    ].forEach(field => checkTextInput(getByTestId, field));
  });

  it('POS:Property Fields', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    [...propertyFields, ...homeAndLocationFields]
      .filter(({ disabled }) => disabled)
      .forEach(field => checkStaticField(getByTestId, field));
  });

  // TODO these tests are SUPER broken. Need to come back and fix
  /*  it('POS:Coverages Fields', async () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    await wait(() => {
      checkTextInput(getByTestId, coverageFields[0])
    })

      checkSelect(getByTestId, coverageFields[1]);
      checkSelect(getByTestId, coverageFields[2]);
      await wait(()=>checkOutput(getByTestId, coverageFields[2]));
      checkSelect(getByTestId, coverageFields[4]);

      checkSelect(getByTestId, otherCoveragesFields[0]);
      [
        ...coverageFields,
        ...otherCoveragesFields,
        ...deductiblesFields,
        ...discountsFields
      ].forEach(field => {
        if (field.output) checkOutput(getByTestId, field);
        if (field.type === 'text') return checkTextInput(getByTestId, field);
        if (field.type === 'select') return checkSelect(getByTestId, field);
        if (field.type === 'radio') return checkRadio(getByTestId, field);
      })
  }, 100000);*/

  it('POS:Wind Mitigation Fields', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    windFields.forEach(field => {
      if (field.type === 'radio') return checkRadio(getByTestId, field);
      if (field.type === 'select') return checkSelect(getByTestId, field);
    });
  });

  it('POS:Remove Secondary Policyholder button works correctly when toggled twice', async () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        policyHolders: [...props.quote.policyHolders, policyHolder]
      }
    };
    const { getByTestId } = render(<QuoteWorkflow {...newProps} />);

    expect(getByTestId('submit')).toBeDisabled();

    await wait(() => {
      expect(getByTestId('policyHolders[1].firstName').value).toEqual(
        newProps.quote.policyHolders[1].firstName
      );
    });

    fireEvent.click(getByTestId('removeSecondary'));

    await wait(() => {
      expect(getByTestId('policyHolders[1].firstName').value).toEqual('');
      expect(getByTestId('submit')).not.toBeDisabled();
    });

    fireEvent.click(getByTestId('removeSecondary'));

    await wait(() => {
      expect(getByTestId('policyHolders[1].firstName').value).toEqual(
        newProps.quote.policyHolders[1].firstName
      );
    });
    expect(getByTestId('submit')).toBeDisabled();
  });

  it('POS:Cannot be modified when editingDisabled is true', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        editingDisabled: true
      }
    };
    const { getByTestId } = render(<QuoteWorkflow {...newProps} />);

    primaryPolicyholderFields.forEach(field => clearText(getByTestId, field));
    expect(getByTestId('submit')).toBeDisabled();
  });

  it('POS:Tests button', () => {
    const { getByRole } = render(<QuoteWorkflow {...props} />);
    expect(getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('POS:Checks that the Reset Button works', async () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        policyHolders: []
      }
    };
    const { getByText, queryByRole, getByRole } = render(
      <QuoteWorkflow {...newProps} />
    );
    await wait(() => {
      expect(queryByRole('status')).not.toBeInTheDocument();
    });

    expect(getByText('Update')).toBeDisabled();

    const primaryPHSection = within(
      getByRole('region', { name: 'primary policyholder info' })
    );

    const firstNameField = primaryPHSection.getByLabelText('First Name');
    const lastNameField = primaryPHSection.getByLabelText('Last Name');
    const phoneField = primaryPHSection.getByLabelText('Primary Phone');
    const emailField = primaryPHSection.getByLabelText('Email Address');

    fireEvent.change(firstNameField, {
      target: { value: 'Nonya' }
    });
    fireEvent.change(lastNameField, {
      target: { value: 'Business' }
    });
    fireEvent.change(phoneField, {
      target: { value: '2352457293' }
    });
    fireEvent.change(emailField, {
      target: { value: 'n@b.com' }
    });

    await wait(() => {
      expect(primaryPHSection.getByLabelText('Email Address')).toHaveValue(
        'n@b.com'
      );
    });

    expect(getByText('Update')).not.toBeDisabled();

    fireEvent.click(getByText('Reset'));

    await wait(() => {
      expect(primaryPHSection.getByLabelText('First Name')).toHaveValue('');
    });

    primaryPolicyholderFields.forEach(({ label }) =>
      expect(primaryPHSection.getByLabelText(label).value).toEqual('')
    );

    await wait(() => {
      expect(getByText('Update')).toBeDisabled();
    });
  });

  it('POS:Check Conditional Options coverageLimits.personalProperty 500,000 or greater', async () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        policyHolders: [...props.quote.policyHolders, policyHolder]
      }
    };
    const { getByTestId, queryByRole } = render(
      <QuoteWorkflow {...newProps} />
    );

    await wait(() => {
      expect(queryByRole('status')).not.toBeInTheDocument();
    });

    await wait(() => {
      expect(
        getByTestId('coverageLimits.personalProperty.value_0')
      ).not.toBeDisabled();
    });
    expect(
      getByTestId('coverageLimits.personalProperty.value_25')
    ).not.toBeDisabled();
    expect(
      getByTestId('coverageLimits.personalProperty.value_35')
    ).not.toBeDisabled();
    expect(
      getByTestId('coverageLimits.personalProperty.value_50')
    ).not.toBeDisabled();

    fireEvent.change(getByTestId('coverageLimits.dwelling.value'), {
      target: { value: '2000000' }
    });

    await wait(() => {
      expect(
        getByTestId('coverageLimits.personalProperty.value_0')
      ).not.toBeDisabled();
    });
    expect(
      getByTestId('coverageLimits.personalProperty.value_25')
    ).not.toBeDisabled();
    expect(
      getByTestId('coverageLimits.personalProperty.value_35')
    ).toBeDisabled();
    expect(
      getByTestId('coverageLimits.personalProperty.value_50')
    ).toBeDisabled();
  });

  it('NEG:All Required Fields Error', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    const checkField = async field => {
      clearText(getByTestId, field);
      fireEvent.blur(getByTestId(field.dataTest));
      await wait(() => {
        checkError(getByTestId, field);
      });
    };

    allFields
      .filter(
        ({ required, disabled, type }) =>
          required && !disabled && type === 'text'
      )
      .forEach(field => {
        checkField(field);
      });
  });
});

import React from 'react';
import {
  fireEvent,
  waitForElement,
  wait,
  within
} from '@testing-library/react';
import * as agencyData from '@exzeo/core-ui/src/@Harmony/Agency/data';

import {
  defaultQuoteWorkflowProps,
  policyHolder,
  renderWithForm,
  searchAgenciesResult,
  searchAgentsResult,
  jestResolve,
  checkHeader,
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
  checkButton,
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
    location: { pathname: '/quote/12-345-67/coverage' }
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
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    pageHeaders.forEach(header => expect(getByTextInsideForm(header.text)));
    // TODO: COLIN -- Check if this is supposed to be disabled
    // expect(getByTestId('removeSecondary')).toBeDisabled();
    allFields
      .filter(field => field.visible !== false)
      .forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:Produced By Fields Placeholder', async () => {
    agencyData.searchAgencies = jestResolve([]);
    agencyData.fetchAgentsByAgencyCode = jestResolve([]);
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
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
    const { getByText, getByTestId } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    const agency = getByTestId('agencyCode_wrapper');
    const agent = getByTestId('agentCode_wrapper');
    await waitForElement(() => getByText(/20000: TEST DEFAULT AGENCY/));
    expect(getByText(/60000: Peregrin Took/));

    fireEvent.keyDown(agency.querySelector('input:not([type="hidden"])'), {
      keyCode: 40
    });
    await waitForElement(() => getByText(/123: TEST NEW AGENCY/));
    fireEvent.click(getByText(/123: TEST NEW AGENCY/));
    // TODO: COLIN -- Figure out how this works
    // await wait(() => expect(agent.textContent).toMatch(/999: Meriadoc Brandybuck/))

    fireEvent.keyDown(agent.querySelector('input:not([type="hidden"])'), {
      keyCode: 40
    });
    await waitForElement(() => getByText(/999: Meriadoc Brandybuck/));
    fireEvent.click(getByText(/999: Meriadoc Brandybuck/));
  });

  it('POS:PolicyHolder Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    [
      ...primaryPolicyholderFields,
      ...secondaryPolicyholderFields
    ].forEach(field => checkTextInput(getByTestId, field));
  });

  it('POS:Property Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    [...propertyFields, ...homeAndLocationFields]
      .filter(({ disabled }) => disabled)
      .forEach(field => checkStaticField(getByTestId, field));
  });

  it('POS:Coverages Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

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
    });
  });

  it('POS:Wind Mitigation Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    windFields.forEach(field => {
      if (field.type === 'radio') return checkRadio(getByTestId, field);
      if (field.type === 'select') return checkSelect(getByTestId, field);
    });
  });

  it('NEG:All Required Fields Error', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

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

  it('POS:Remove Secondary Policyholder button works correctly when toggled twice', async () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        policyHolders: [...props.quote.policyHolders, policyHolder]
      }
    };
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...newProps} />);

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
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...newProps} />);

    primaryPolicyholderFields.forEach(field => clearText(getByTestId, field));
    expect(getByTestId('submit')).toBeDisabled();
  });

  it('POS:Tests button', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    expect(getByText('Reset').textContent).toMatch(/Reset/);
  });

  it('POS:Checks that the Reset Button works', () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
        policyHolders: []
      }
    };
    const { getByText, getByLabelText, getByTestId } = renderWithForm(
      <QuoteWorkflow {...newProps} />
    );

    expect(getByText('Update')).toBeDisabled();
    primaryPolicyholderFields.forEach(({ label, value, dataTest }) => {
      fireEvent.change(getByTestId(dataTest), {
        target: { value }
      });
    });
    expect(getByText('Update')).not.toBeDisabled();
    fireEvent.click(getByText('Reset'));
    waitForElement(() => {
      primaryPolicyholderFields.forEach(({ dataTest }) =>
        expect(getByTestId(dataTest).value).toEqual('')
      );
    });

    expect(getByText('Update')).toBeDisabled();
  });
});

import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  defaultQuoteWorkflowProps,
  renderWithForm,
  mockServiceRunner,
  searchAgenciesResult as result,
  checkTypeahead,
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
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [
  { text: 'Produced By' }, { text: 'Primary Policyholder' }, { text: 'Secondary Policyholder' },
  { text: 'Property Address' }, { text: 'Home and Location' }, { text: 'Coverages' },
  { text: 'Other Coverages' }, { text: 'Deductibles' }, { text: 'Discounts' }
];

describe('Testing the Coverage/Rating Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/coverage' },
  };

  const allFields = [
    ...producedByFields, ...primaryPolicyholderFields, ...secondaryPolicyholderFields,
    ...propertyFields, ...homeAndLocationFields, ...coverageFields, ...otherCoveragesFields,
    ...deductiblesFields, ...discountsFields, ...windFields
  ];

  it('POS:Checks Header and Labels for all fields', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header));
    // TODO: COLIN -- Check if this is supposed to be disabled
    // expect(getByTestId('removeSecondary')).toBeDisabled();
    allFields.filter(field => field.visible !== false).forEach(field => checkLabel(getByTestId, field));
  });

  it('POS:PolicyHolder Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    primaryPolicyholderFields.forEach(field => checkTextInput(getByTestId, field));
    secondaryPolicyholderFields.forEach(field => checkTextInput(getByTestId, field));
  });

  it('POS:Property Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    [...propertyFields, ...homeAndLocationFields].filter(({ disabled }) => disabled)
      .forEach(field => checkStaticField(getByTestId, field));
  });

  it('POS:Coverages Fields', () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    [...coverageFields, ...otherCoveragesFields, ...deductiblesFields, ...discountsFields]
      .forEach(field => {
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

    allFields.filter(({ required, disabled, type }) => required && !disabled && type === 'text').forEach(field => {
      clearText(getByTestId, field);
      fireEvent.blur(getByTestId(field.name));
      checkError(getByTestId, field);
    });
  });
});

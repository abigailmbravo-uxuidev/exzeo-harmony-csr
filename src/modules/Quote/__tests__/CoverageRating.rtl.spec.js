import React from 'react';
import { fireEvent, waitForElement, wait } from 'react-testing-library';

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
  }

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

  it('POS:Produced By Fields', async () => {
    mockServiceRunner(result);
    const { getByText, getByTestId, getByLabelText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('20000: TYPTAP MANAGEMENT COMPANY'))
    const getSelect = async (testId, itemText) => {
      const wrapper = getByTestId(`${testId}_wrapper`);

      // Click 'a' key
      fireEvent.keyDown(wrapper.querySelector('div.Select.TypeAhead'), { keyCode: 40 });
      await waitForElement(() => getByText(itemText));
      fireEvent.click(getByText(itemText));
    };
    await getSelect('agencyCode', '20000: TYPTAP MANAGEMENT COMPANY')

    await getSelect('agencyCode', /COLIN/i)


    // await waitForElement(() => getByText('20000: TYPTAP MANAGEMENT COMPANY'));
    // producedByFields.forEach(field => {
    //   if (field.type === 'text') checkTextInput(getByTestId, field);
    //   if (field.type === 'typeahead' && !field.disabled) {
    //     checkTypeahead(getByTestId, field);
    //   };
      
    // });
    // const wrapper = getByTestId('agencyCode_wrapper');
    // // const input = wrapper.querySelector('input:not([type="hidden"])');
    // const select = wrapper.querySelector('Select');
    // console.log(select)
    // // fireEvent.change(input, { target: { value: '20000', action: 'input-change' }});
    // // await wait(() => expect(input.value).toEqual('20000'));
    // // console.log(wrapper.querySelectorAll('div.react-select__menu'))
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

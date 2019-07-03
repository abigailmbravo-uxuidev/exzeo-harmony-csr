import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  underwritingResult as result,
  checkHeader,
  checkRadio,
  checkButton
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [{ text: 'Underwriting Questions' }];

const underwritingFields = [
  {
    dataTest: 'underwritingAnswers.rented.answer',
    type: 'radio',
    values: ['Yes', 'Occasionally', 'Never'],
    label: 'Is the home or any structures on the property ever rented?'
  },
  {
    dataTest: 'underwritingAnswers.previousClaims.answer',
    type: 'radio',
    values: [
      'No claims ever filed',
      'Less than 3 Years',
      '3-5 Years',
      'Over 5 Years',
      'Unknown'
    ],
    label: 'When was the last claim filed?'
  },
  {
    dataTest: 'underwritingAnswers.monthsOccupied.answer',
    type: 'radio',
    values: ['0-3', '4-6', '7-9', '10+'],
    label: 'How many months a year does the owner live in the home?'
  },
  {
    dataTest: 'underwritingAnswers.fourPointUpdates.answer',
    type: 'radio',
    values: ['No', 'Unknown', 'Yes'],
    label:
      'Have the wiring, plumbing, and HVAC been updated in the last 35 years?'
  },
  {
    dataTest: 'underwritingAnswers.business.answer',
    type: 'radio',
    values: ['Yes', 'No'],
    label: 'Is a business conducted on the property?'
  }
];

mockServiceRunner(result);

describe('Testing Underwriting', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/underwriting' }
  };

  it('POS:Checks Header and Question Labels', async () => {
    const { getByText, getByTestId } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_Occasionally')
    );

    pageHeaders.forEach(header => checkHeader(getByText, header));
    underwritingFields.forEach(({ label }) => expect(getByText(label)));
  });

  it('POS:Checks all field labels', async () => {
    const { getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_Occasionally')
    );

    underwritingFields.forEach(field => checkRadio(getByTestId, field));
  });

  it('POS:Tests button', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    checkButton(getByText, { dataTest: 'reset', text: 'Reset' });
    checkButton(getByText);
  });

  it('POS:Checks that the Reset Button/Submit Button work', async () => {
    const { getByTestId, getByText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() =>
      getByTestId('underwritingAnswers.rented.answer_Occasionally')
    );

    expect(getByText('Update')).toBeDisabled();
    underwritingFields.forEach(field =>
      fireEvent.click(getByTestId(`${field.dataTest}_${field.values[0]}`))
    );
    expect(getByText('Update')).not.toBeDisabled();
    fireEvent.click(getByText('Reset'));
    underwritingFields.forEach(field =>
      expect(
        getByTestId(`${field.dataTest}_${field.values[0]}`).parentNode.className
      ).toEqual('label-segmented')
    );
    expect(getByText('Update')).toBeDisabled();
  });
});

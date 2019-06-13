import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  rating,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkSelect,
  verifyForm,
  additionalInterest
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const baseAiFields = [
  {
    name: 'name1',
    type: 'text',
    required: true,
    label: 'First Name',
    data: 'test last names',
  },
  {
    name: 'name2',
    type: 'text',
    label: 'Last Name',
    data: 'test first name',
  },
  {
    name: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    data: 'test adress 1',
  },
  {
    name: 'address2',
    type: 'text',
    label: 'Address 2',
    data: 'test address 2',
  },
  {
    name: 'city',
    type: 'text',
    required: true,
    label: 'City',
    data: 'test city',
  },
  {
    name: 'state',
    type: 'text',
    required: true,
    label: 'State',
    data: 'FL',
  },
  {
    name: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    data: 'test name 1',
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    data: '(123) 123-1231'
  },
  {
    name: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    data: '123'
  }
];

const mortgageeFields = [
  {
    name: 'name1',
    type: 'text',
    required: true,
    label: 'Name 1',
    data: 'test name 1',
  },
  {
    name: 'name2',
    type: 'text',
    label: 'Name 2',
    data: 'test name 2',
  },
  {
    name: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    data: 'test adress 1',
  },
  {
    name: 'address2',
    type: 'text',
    label: 'Address 2',
    data: 'test address 2',
  },
  {
    name: 'city',
    type: 'text',
    required: true,
    label: 'City',
    data: 'test city',
  },
  {
    name: 'state',
    type: 'text',
    required: true,
    label: 'State',
    data: 'FL',
  },
  {
    name: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    data: 'test name 1',
  },
  {
    name: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    data: '(123) 123-1231'
  },
  {
    name: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    data: '1`23'
  }
];


describe('Additional Interest Testing', () => {
  const baseRequiredFields = baseAiFields.filter(({ required }) => required);

  const openAndCloseModal = (getByText, modal) => {
    fireEvent.click(getByText(modal));
    expect(getByText('save'));
    expect(document.querySelector('form#AdditionalInterestModal'));
    fireEvent.click(getByText('cancel'));
    expect(document.querySelector('form#AdditionalInterestModal')).toBeNull();
  };

  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' },
    quoteData: {
      ...defaultQuoteWorkflowProps.quoteData,
      rating
    }
  };

  it('POS:Error Message exists with no quote data', () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
        rating: {}
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(getByText('Additional Interests cannot be accessed until Premium calculated.'));
  });

  it('NEG:Mortgagee Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Mortgagee Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Mortgagee'));

    const stateField = baseAiFields.find(({ name }) => name === 'state');
    const zipField = baseAiFields.find(({ name }) => name === 'zip');

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    // verifyForm(getByTestId, [{
    //   ...zipField, data: 'abcd', error: 'Not a valid zip code'
    // }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:Additional Insured Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Insured'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Additional Insured Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Insured'));

    const stateField = baseAiFields.find(({ name }) => name === 'state');
    const zipField = baseAiFields.find(({ name }) => name === 'zip');

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    // TODO: COLIN -- Check if this is a bug or not
    // verifyForm(getByTestId, [{
    //   ...zipField, data: 'abcd', error: 'Not a valid zip code'
    // }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:Additional Interest Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Interest'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Additional Interest Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Additional Interest'));

    const stateField = baseAiFields.find(({ name }) => name === 'state');
    const zipField = baseAiFields.find(({ name }) => name === 'zip');

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    // verifyForm(getByTestId, [{
    //   ...zipField, data: 'abcd', error: 'Not a valid zip code'
    // }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:Premium Finance Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Premium Finance'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Premium Finance Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Premium Finance'));

    const stateField = baseAiFields.find(({ name }) => name === 'state');
    const zipField = baseAiFields.find(({ name }) => name === 'zip');

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    // verifyForm(getByTestId, [{
    //   ...zipField, data: 'abcd', error: 'Not a valid zip code'
    // }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('NEG:Bill Payer Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Bill Payer'));

    baseRequiredFields.forEach(fieldToLeaveBlank => verifyForm(getByTestId, baseRequiredFields, [fieldToLeaveBlank], 'ai-modal-submit'));
  });

  it('NEG:Bill Payer Invalid Input Testing', () => {
    const { getByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);
    fireEvent.click(getByText('Bill Payer'));

    const stateField = baseAiFields.find(({ name }) => name === 'state');
    const zipField = baseAiFields.find(({ name }) => name === 'zip');

    verifyForm(getByTestId, [{
      ...stateField, data: 'abc', error: 'Only 2 letters allowed'
    }], [], 'ai-modal-submit');
    // verifyForm(getByTestId, [{
    //   ...zipField, data: 'abcd', error: 'Not a valid zip code'
    // }], [], 'ai-modal-submit');
    verifyForm(getByTestId, [{
      ...zipField, data: '1234567890', error: 'Only 8 letters or numbers allowed'
    }], [], 'ai-modal-submit');
  });

  it('POS:Checks Header and Buttons', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    const checkButtonTextIcon = text => expect(getByText(text).previousSibling.className).toEqual('fa fa-plus');

    checkHeader(getByText, { text: 'Additional Interests' });
    checkButtonTextIcon('Mortgagee');
    checkButtonTextIcon('Additional Insured');
    checkButtonTextIcon('Additional Interest');
    checkButtonTextIcon('Premium Finance');
    checkButtonTextIcon('Bill Payer');
  });

  it('POS:Mortgagee Modal Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Mortgagee');

    fireEvent.click(getByText('Mortgagee'));
    expect(getAllByText('Mortgagee')[1].firstChild.className).toEqual('fa Mortgagee');
    mortgageeFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, { name: 'mortgage', label: 'Top Mortgagees' });
    checkSelect(getByTestId, { name: 'order', type: 'select', values: ['0']});
  });

  it('POS:Additional Insured Modal Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Additional Insured');

    fireEvent.click(getByText('Additional Insured'));
    expect(getAllByText('Additional Insured')[1].firstChild.className).toEqual('fa Additional Insured');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Additional Interest Modal Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Additional Interest');

    fireEvent.click(getByText('Additional Interest'));
    expect(getAllByText('Additional Interest')[1].firstChild.className).toEqual('fa Additional Interest');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Premium Finance Modal Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Premium Finance');

    fireEvent.click(getByText('Premium Finance'));
    expect(getAllByText('Premium Finance')[1].firstChild.className).toEqual('fa Premium Finance');
    mortgageeFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
    checkLabel(getByTestId, { name: 'premiumFinance', label: 'Top Premium Finance' });
  });

  it('POS:Bill Payer Modal Testing', () => {
    const { getByText, getAllByText, getByTestId } = renderWithForm(<QuoteWorkflow {...props} />);

    openAndCloseModal(getByText, 'Bill Payer');

    fireEvent.click(getByText('Bill Payer'));
    expect(getAllByText('Bill Payer')[1].firstChild.className).toEqual('fa Bill Payer');
    baseAiFields.forEach(field => {
      checkLabel(getByTestId, field);
      checkTextInput(getByTestId, field);
    });
  });

  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Premium Finance]', () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
        additionalInterests: [
          // Intentionally give a messed up order...
          { ...additionalInterest, order: 0, type: 'Premium Finance' },
          { ...additionalInterest, order: 1, type: 'Additional Interest' },
          { ...additionalInterest, order: 2, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Additional Insured' },
          { ...additionalInterest, order: 0, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Mortgagee' },
          { ...additionalInterest, order: 0, type: 'Additional Interest' },
          { ...additionalInterest, order: 0, type: 'Additional Insured' },
        ]
      }
    };

    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Premium Finance 1'
    ];

    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    // ...so we know the UI will still organize and sort them correctly, in order
    const labelTexts = document.querySelectorAll('.results.result-cards li.card .card-icon label');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
    // Check our buttons are all disabled
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });

  // This test is identical to the one above it except it uses a bill payer
  it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Bill Payer]', () => {
    const newProps = {
      ...props,
      quoteData: {
        ...props.quoteData,
        additionalInterests: [
          { ...additionalInterest, order: 0, type: 'Bill Payer' },
          { ...additionalInterest, order: 1, type: 'Additional Interest' },
          { ...additionalInterest, order: 2, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Additional Insured' },
          { ...additionalInterest, order: 0, type: 'Mortgagee' },
          { ...additionalInterest, order: 1, type: 'Mortgagee' },
          { ...additionalInterest, order: 0, type: 'Additional Interest' },
          { ...additionalInterest, order: 0, type: 'Additional Insured' }
        ]
      }
    };

    const expectedLabels = [
      'Mortgagee 1', 'Mortgagee 2', 'Mortgagee 3',
      'Additional Insured 1', 'Additional Insured 2',
      'Additional Interest 1', 'Additional Interest 2',
      'Bill Payer 1'
    ];

    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);
    const labelTexts = document.querySelectorAll('.results.result-cards li.card .card-icon label');
    labelTexts.forEach((label, i) => expect(label.textContent).toEqual(expectedLabels[i]));
    expect(getByText('Mortgagee')).toBeDisabled();
    expect(getByText('Additional Insured')).toBeDisabled();
    expect(getByText('Additional Interest')).toBeDisabled();
    expect(getByText('Premium Finance')).toBeDisabled();
    expect(getByText('Bill Payer')).toBeDisabled();
  });
});

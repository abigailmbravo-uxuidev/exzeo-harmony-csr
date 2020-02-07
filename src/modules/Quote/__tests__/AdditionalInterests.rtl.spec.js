import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  rating,
  checkHeader,
  checkLabel,
  checkTextInput,
  checkSelect,
  verifyForm,
  additionalInterest,
  mockServiceRunner,
  mockQuestions
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

mockServiceRunner([]);
mockQuestions([]);

const baseAiFields = [
  {
    dataTest: 'name1',
    type: 'text',
    required: true,
    label: 'First Name',
    value: 'test last names'
  },
  {
    dataTest: 'name2',
    type: 'text',
    label: 'Last Name',
    value: 'test first name'
  },
  {
    dataTest: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    value: 'test adress 1'
  },
  {
    dataTest: 'address2',
    type: 'text',
    label: 'Address 2',
    value: 'test address 2'
  },
  {
    dataTest: 'city',
    type: 'text',
    required: true,
    label: 'City',
    value: 'test city'
  },
  {
    dataTest: 'state',
    type: 'text',
    required: true,
    label: 'State',
    value: 'FL'
  },
  {
    dataTest: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    value: 'test name 1'
  },
  {
    dataTest: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    value: '(123) 123-1231'
  },
  {
    dataTest: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    value: '123'
  }
];

const mortgageeFields = [
  {
    dataTest: 'name1',
    type: 'text',
    required: true,
    label: 'Name 1',
    value: 'test name 1'
  },
  {
    dataTest: 'name2',
    type: 'text',
    label: 'Name 2',
    value: 'test name 2'
  },
  {
    dataTest: 'address1',
    type: 'text',
    required: true,
    label: 'Address 1',
    value: 'test adress 1'
  },
  {
    dataTest: 'address2',
    type: 'text',
    label: 'Address 2',
    value: 'test address 2'
  },
  {
    dataTest: 'city',
    type: 'text',
    required: true,
    label: 'City',
    value: 'test city'
  },
  {
    dataTest: 'state',
    type: 'text',
    required: true,
    label: 'State',
    value: 'FL'
  },
  {
    dataTest: 'zip',
    type: 'text',
    required: true,
    label: 'Zip Code',
    value: 'test name 1'
  },
  {
    dataTest: 'phoneNumber',
    type: 'text',
    label: 'Phone Number',
    value: '(123) 123-1231'
  },
  {
    dataTest: 'referenceNumber',
    type: 'text',
    label: 'Reference Number',
    value: '1`23'
  }
];

describe('Additional Interest Testing', () => {
  const baseRequiredFields = baseAiFields.filter(({ required }) => required);

  const openAndCloseModal = async (getByText, modal) => {
    fireEvent.click(getByText(modal));
    await wait(() => {
      expect(document.querySelector('modal').toBeInTheDocument());
      expect(
        document.querySelector(`card.AdditionalInterestModal.${modal}`)
      ).toBeInTheDocument();
    });
    fireEvent.click(getByText('cancel'));
    await wait(() => expect(document.querySelector('modal')).toBeNull());
  };

  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/additionalInterests' },
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      rating
    },
    options: {
      ...defaultQuoteWorkflowProps.options,
      order: [{ answer: '0', label: 'First Mortgagee' }]
    }
  };

  const stateField = baseAiFields.find(({ dataTest }) => dataTest === 'state');
  const zipField = baseAiFields.find(({ dataTest }) => dataTest === 'zip');

  it('POS:Error Message exists with no quote data', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        rating: {}
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText(
        'Additional Interests cannot be accessed until Premium calculated.'
      )
    );
  });

  it('NEG:Mortgagee Empty Testing', () => {
    const { getByText, getByTestId } = renderWithForm(
      <QuoteWorkflow {...props} />
    );

    const openAndCloseModal = async (getByText, modal) => {
      fireEvent.click(getByText(modal));
      await wait(() => {
        expect(document.querySelector('modal').toBeInTheDocument());
        expect(
          document.querySelector(`card.AdditionalInterestModal.${modal}`)
        ).toBeInTheDocument();
      });
      fireEvent.click(getByText('cancel'));
      await wait(() => expect(document.querySelector('modal')).toBeNull());
    };

    openAndCloseModal(getByText, 'Mortgagee');
    //fireEvent.click(getByText('Save'));

    //expect(getByTestId('name1_error'))

    //  fireEvent.click(getByText('Save'));

    // baseRequiredFields.forEach(fieldToLeaveBlank =>
    //   verifyForm(
    //     getByTestId,
    //     baseRequiredFields,
    //     [fieldToLeaveBlank],
    //     'ai-modal-submit'
    //   )
    // );
  });

  // it('NEG:Mortgagee Invalid Input Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Mortgagee'));

  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...stateField,
  //         value: 'abc',
  //         error: 'Only 2 letters allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...zipField,
  //         value: '1234567890',
  //         error: 'Only 5 numbers allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  // });

  // it('NEG:Additional Insured Empty Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Additional Insured'));

  //   baseRequiredFields.forEach(fieldToLeaveBlank =>
  //     verifyForm(
  //       getByTestId,
  //       baseRequiredFields,
  //       [fieldToLeaveBlank],
  //       'ai-modal-submit'
  //     )
  //   );
  // });

  // it('NEG:Additional Insured Invalid Input Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Additional Insured'));

  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...stateField,
  //         value: 'abc',
  //         error: 'Only 2 letters allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...zipField,
  //         value: '1234567890',
  //         error: 'Only 5 numbers allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  // });

  // it('NEG:Additional Interest Empty Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Additional Interest'));

  //   baseRequiredFields.forEach(fieldToLeaveBlank =>
  //     verifyForm(
  //       getByTestId,
  //       baseRequiredFields,
  //       [fieldToLeaveBlank],
  //       'ai-modal-submit'
  //     )
  //   );
  // });

  // it('NEG:Additional Interest Invalid Input Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Additional Interest'));

  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...stateField,
  //         value: 'abc',
  //         error: 'Only 2 letters allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...zipField,
  //         value: '1234567890',
  //         error: 'Only 5 numbers allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  // });

  // it('NEG:Premium Finance Empty Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Premium Finance'));

  //   baseRequiredFields.forEach(fieldToLeaveBlank =>
  //     verifyForm(
  //       getByTestId,
  //       baseRequiredFields,
  //       [fieldToLeaveBlank],
  //       'ai-modal-submit'
  //     )
  //   );
  // });

  // it('NEG:Premium Finance Invalid Input Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Premium Finance'));

  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...stateField,
  //         value: 'abc',
  //         error: 'Only 2 letters allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...zipField,
  //         value: '1234567890',
  //         error: 'Only 5 numbers allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  // });

  // it('NEG:Bill Payer Empty Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Bill Payer'));

  //   baseRequiredFields.forEach(fieldToLeaveBlank =>
  //     verifyForm(
  //       getByTestId,
  //       baseRequiredFields,
  //       [fieldToLeaveBlank],
  //       'ai-modal-submit'
  //     )
  //   );
  // });

  // it('NEG:Bill Payer Invalid Input Testing', () => {
  //   const { getByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );
  //   fireEvent.click(getByText('Bill Payer'));

  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...stateField,
  //         value: 'abc',
  //         error: 'Only 2 letters allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  //   verifyForm(
  //     getByTestId,
  //     [
  //       {
  //         ...zipField,
  //         value: '1234567890',
  //         error: 'Only 5 numbers allowed'
  //       }
  //     ],
  //     [],
  //     'ai-modal-submit'
  //   );
  // });

  // it('POS:Checks Header and Buttons', () => {
  //   const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

  //   const checkButtonTextIcon = text =>
  //     expect(getByText(text).previousSibling.className).toEqual('fa fa-plus');

  //   checkHeader(getByText, { text: 'Additional Interests' });
  //   checkButtonTextIcon('Mortgagee');
  //   checkButtonTextIcon('Additional Insured');
  //   checkButtonTextIcon('Additional Interest');
  //   checkButtonTextIcon('Premium Finance');
  //   checkButtonTextIcon('Bill Payer');
  // });

  // it('POS:Mortgagee Modal Testing', () => {
  //   const { getByText, getAllByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );

  //   openAndCloseModal(getByText, 'Mortgagee');

  //   fireEvent.click(getByText('Mortgagee'));
  //   expect(getAllByText('Mortgagee')[1].firstChild.className).toEqual(
  //     'fa Mortgagee'
  //   );
  //   mortgageeFields.forEach(field => {
  //     checkLabel(getByTestId, field);
  //     checkTextInput(getByTestId, field);
  //   });
  //   checkLabel(getByTestId, { dataTest: 'mortgage', label: 'Top Mortgagees' });
  //   // checkSelect(getByTestId, {
  //   //   dataTest: 'order',
  //   //   defaultValue: { value: '0', label: 'First Mortgagee' },
  //   //   type: 'select',
  //   //   values: [{ value: '0', label: 'First Mortgagee' }]
  //   // });
  // });

  // it('POS:Additional Insured Modal Testing', () => {
  //   const { getByText, getAllByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );

  //   openAndCloseModal(getByText, 'Additional Insured');

  //   fireEvent.click(getByText('Additional Insured'));
  //   expect(getAllByText('Additional Insured')[1].firstChild.className).toEqual(
  //     'fa Additional Insured'
  //   );
  //   baseAiFields.forEach(field => {
  //     checkLabel(getByTestId, field);
  //     checkTextInput(getByTestId, field);
  //   });
  // });

  // it('POS:Additional Interest Modal Testing', () => {
  //   const { getByText, getAllByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );

  //   openAndCloseModal(getByText, 'Additional Interest');

  //   fireEvent.click(getByText('Additional Interest'));
  //   expect(getAllByText('Additional Interest')[1].firstChild.className).toEqual(
  //     'fa Additional Interest'
  //   );
  //   baseAiFields.forEach(field => {
  //     checkLabel(getByTestId, field);
  //     checkTextInput(getByTestId, field);
  //   });
  // });

  // it('POS:Premium Finance Modal Testing', () => {
  //   const { getByText, getAllByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );

  //   openAndCloseModal(getByText, 'Premium Finance');

  //   fireEvent.click(getByText('Premium Finance'));
  //   expect(getAllByText('Premium Finance')[1].firstChild.className).toEqual(
  //     'fa Premium Finance'
  //   );
  //   mortgageeFields.forEach(field => {
  //     checkLabel(getByTestId, field);
  //     checkTextInput(getByTestId, field);
  //   });
  //   checkLabel(getByTestId, {
  //     dataTest: 'premiumFinance',
  //     label: 'Top Premium Finance'
  //   });
  // });

  // it('POS:Bill Payer Modal Testing', () => {
  //   const { getByText, getAllByText, getByTestId } = renderWithForm(
  //     <QuoteWorkflow {...props} />
  //   );

  //   openAndCloseModal(getByText, 'Bill Payer');

  //   fireEvent.click(getByText('Bill Payer'));
  //   expect(getAllByText('Bill Payer')[1].firstChild.className).toEqual(
  //     'fa Bill Payer'
  //   );
  //   baseAiFields.forEach(field => {
  //     checkLabel(getByTestId, field);
  //     checkTextInput(getByTestId, field);
  //   });
  // });

  // it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Premium Finance]', () => {
  //   const newProps = {
  //     ...props,
  //     quote: {
  //       ...props.quote,
  //       additionalInterests: [
  //         // Intentionally give a messed up order...
  //         { ...additionalInterest, order: 0, type: 'Premium Finance' },
  //         { ...additionalInterest, order: 1, type: 'Additional Interest' },
  //         { ...additionalInterest, order: 2, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 1, type: 'Additional Insured' },
  //         { ...additionalInterest, order: 0, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 1, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 0, type: 'Additional Interest' },
  //         { ...additionalInterest, order: 0, type: 'Additional Insured' }
  //       ]
  //     }
  //   };

  //   const expectedLabels = [
  //     'Mortgagee 1',
  //     'Mortgagee 2',
  //     'Mortgagee 3',
  //     'Additional Insured 1',
  //     'Additional Insured 2',
  //     'Additional Interest 1',
  //     'Additional Interest 2',
  //     'Premium Finance 1'
  //   ];

  //   const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

  //   // ...so we know the UI will still organize and sort them correctly, in order
  //   const labelTexts = document.querySelectorAll(
  //     '.results.result-cards li.card .card-icon label'
  //   );
  //   labelTexts.forEach((label, i) =>
  //     expect(label.textContent).toEqual(expectedLabels[i])
  //   );
  //   // Check our buttons are all disabled
  //   expect(getByText('Mortgagee')).toBeDisabled();
  //   expect(getByText('Additional Insured')).toBeDisabled();
  //   expect(getByText('Additional Interest')).toBeDisabled();
  //   expect(getByText('Premium Finance')).toBeDisabled();
  //   expect(getByText('Bill Payer')).toBeDisabled();
  // });

  // // This test is identical to the one above it except it uses a bill payer
  // it('POS:Confirm Additional Interests Show Up In Order and Disable Buttons [Bill Payer]', () => {
  //   const newProps = {
  //     ...props,
  //     quote: {
  //       ...props.quote,
  //       additionalInterests: [
  //         { ...additionalInterest, order: 0, type: 'Bill Payer' },
  //         { ...additionalInterest, order: 1, type: 'Additional Interest' },
  //         { ...additionalInterest, order: 2, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 1, type: 'Additional Insured' },
  //         { ...additionalInterest, order: 0, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 1, type: 'Mortgagee' },
  //         { ...additionalInterest, order: 0, type: 'Additional Interest' },
  //         { ...additionalInterest, order: 0, type: 'Additional Insured' }
  //       ]
  //     }
  //   };

  //   const expectedLabels = [
  //     'Mortgagee 1',
  //     'Mortgagee 2',
  //     'Mortgagee 3',
  //     'Additional Insured 1',
  //     'Additional Insured 2',
  //     'Additional Interest 1',
  //     'Additional Interest 2',
  //     'Bill Payer 1'
  //   ];

  //   const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);
  //   const labelTexts = document.querySelectorAll(
  //     '.results.result-cards li.card .card-icon label'
  //   );
  //   labelTexts.forEach((label, i) =>
  //     expect(label.textContent).toEqual(expectedLabels[i])
  //   );
  //   expect(getByText('Mortgagee')).toBeDisabled();
  //   expect(getByText('Additional Insured')).toBeDisabled();
  //   expect(getByText('Additional Interest')).toBeDisabled();
  //   expect(getByText('Premium Finance')).toBeDisabled();
  //   expect(getByText('Bill Payer')).toBeDisabled();
  // });

  // it('POS:All buttons disabled when editingDisabled is true', () => {
  //   const newProps = {
  //     ...props,
  //     quote: {
  //       ...props.quote,
  //       editingDisabled: true
  //     }
  //   };
  //   const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);
  //   // Check our buttons are all disabled
  //   expect(getByText('Mortgagee')).toBeDisabled();
  //   expect(getByText('Additional Insured')).toBeDisabled();
  //   expect(getByText('Additional Interest')).toBeDisabled();
  //   expect(getByText('Premium Finance')).toBeDisabled();
  //   expect(getByText('Bill Payer')).toBeDisabled();
  // });
});

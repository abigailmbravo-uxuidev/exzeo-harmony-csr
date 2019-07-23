import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  checkHeader,
  rating,
  checkTextInput,
  checkButton,
  clearText,
  checkError,
  mockServiceRunner
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [
  { text: 'Quote Details' },
  { text: 'Coverage / Rating' },
  { text: 'Primary Policyholder' },
  { text: 'Mailing Address' },
  { text: 'Additional Interests' }
];

const fields = [
  { dataTest: 'name', label: 'Email To Name', data: 'Robert Pollard' },
  { dataTest: 'email', label: 'Email Address', data: 'fake@aol.com' }
];

const agencyResult = [
  {
    agentCode: 60000,
    firstName: 'WALLY',
    lastName: 'WAGONER'
  }
];

mockServiceRunner(agencyResult);

describe('Summary testing with finished Quote', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      agencyCode: '',
      quoteInputState: 'Qualified',
      rating
    },
    location: { pathname: '/quote/12-345-67/summary' }
  };

  it('POS:Checks Headers', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('Displays quote details', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    expect(getByText('Quote Number'));
    expect(getByText('12-345-67'));
    expect(getByText('Property Address'));
    expect(getByText('4131 TEST ADDRESS'));
    expect(getByText('Year Built'));
    expect(getByText('1958'));
    expect(getByText('Effective Date'));
    expect(getByText('05/23/2019'));
    expect(getByText('Agent'));
  });

  it('POS:Coverage Rating', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    expect(getByText('Yearly Premium'));
    expect(getByText('$ 9,876'));
    expect(getByText('A. Dwelling'));
    expect(getByText('$ 100'));
    expect(getByText('B. Other Structures'));
    expect(getByText('$ 50'));
    expect(getByText('C. Personal Property'));
    expect(getByText('$ 999'));
    expect(getByText('D. Loss Of Use'));
    expect(getByText('$ 666'));
    expect(getByText('E. Personal Liability'));
    expect(getByText('$ 55'));
    expect(getByText('F. Medical Payments'));
    expect(getByText('$ 88'));
    expect(getByText('Personal Property Replacement Cost'));
    expect(getByText('Yes'));
    expect(getByText('Mold Property'));
    expect(getByText('$ 44'));
    expect(getByText('Mold Liability'));
    expect(getByText('$ 22'));
    expect(getByText('Ordinance or Law'));
    expect(getByText('29%'));
    expect(getByText('All Other Perils Deductible'));
    expect(getByText('$ 22'));
    expect(getByText('Hurricane Deductible'));
    expect(getByText('11%'));
    expect(getByText('Calculated Hurricane Deductible'));
    expect(getByText('$ 12,345'));
    expect(getByText('Sinkhole Deductible'));
    expect(getByText('32%'));
    expect(getByText('Calculated Sinkhole Deductible'));
    expect(getByText('$ 2,468'));
  });

  it('POS:Primary Policyholder Testing', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    expect(getByText('Policyholder Name'));
    expect(getByText('Robert Pollard'));
    expect(getByText('Phone Number'));
    expect(getByText('(123) 123-1231'));
    expect(getByText('Email'));
    expect(getByText('AlienLanes@gbv.com'));
    expect(getByText('Electronic Delivery'));
    expect(getByText('No'));
  });

  it('POS:Mailing Address', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    expect(getByText('Address'));
    expect(getByText('6666 mailing address'));
    expect(getByText('City/State/Zip'));
    expect(getByText('TAMPA, FL 98765'));
    expect(getByText('Country'));
    expect(getByText('test country'));
  });

  it('POS:Share Fields', () => {
    const { getByLabelText, getByTestId, getByText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );

    fields.forEach(field => checkTextInput(getByLabelText, field));
    checkButton(getByText, { text: 'Share', type: 'submit' });

    fields.forEach(field => {
      const fieldInput = getByTestId(field.dataTest);
      clearText(getByTestId, field);
      fireEvent.blur(fieldInput);
      checkError(getByTestId, field);
    });
  });
});

describe('Summary Testing with Default Quote', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      rating
    },
    location: { pathname: '/quote/12-345-67/summary' }
  };

  it('POS:Underwriting Violation Error with initial quote data', () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('POS:Underwriting Violations Error Message in Underwriting State', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Underwriting'
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('POS:Underwriting Violations Error Message in Qualified State w/ UW Error', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified',
        hasUWError: true
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('NEG:No Error Message with Qualified State and no UW Errors', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified'
      }
    };
    const { queryByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      queryByText(
        'Quote Summary cannot be sent due to Underwriting Validations'
      )
    ).toBeNull();
  });

  it('POS:Underwriting Violations Error Message in Ready State w/ UW Error', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Ready',
        hasUWError: true
      }
    };
    const { getByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('NEG:No Error Message with Ready State and no UW Errors', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Ready'
      }
    };

    const { queryByText } = renderWithForm(<QuoteWorkflow {...newProps} />);

    expect(
      queryByText(
        'Quote Summary cannot be sent due to Underwriting Validations'
      )
    ).toBeNull();
  });
});

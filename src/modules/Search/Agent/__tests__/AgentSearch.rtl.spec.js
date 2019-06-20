import React from 'react';
import { reduxForm } from 'redux-form';

import {
  renderWithForm,
  checkLabel,
  checkTextInput,
  checkSelect,
  checkButton
} from '../../../../test-utils';
import AgentSearch from '../AgentSearch';

const fields = [
  {
    dataTest: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agent',
    options: ['Agent Search', 'Agency Search']
  },
  {
    dataTest: 'agentCode',
    type: 'text',
    label: 'Agent ID',
    placeholder: 'Agent ID Search',
    data: '1234'
  },
  {
    dataTest: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name Search',
    data: 'Holly'
  },
  {
    dataTest: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name Search',
    data: 'Hunter'
  },
  {
    dataTest: 'address',
    type: 'text',
    label: 'Agent Address',
    placeholder: 'Agent Address Search',
    data: '1234 Mulholland Drive'
  },
  {
    dataTest: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholder: 'Lic No Search',
    data: '123456'
  }
];

describe('Agent Search Testing', () => {
  const props = {
    submitting: false,
    searchTypeOptions: [
      { answer: 'agent', label: 'Agent Search' },
      { answer: 'agency', label: 'Agency Search' }
    ]
  };

  const SearchForm = reduxForm({
    form: 'SEARCH_BAR',
    initialValues: { searchType: 'agent' }
  })(AgentSearch);

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Renders and has fields and labels', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholder }) =>
      expect(getByPlaceholderText(placeholder))
    );
    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field => checkTextInput(getByPlaceholderText, field));
  });

  it('POS:Agent Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, { dataTest: 'submit', type: 'submit' });
  });
});

import React from 'react';
import { reduxForm } from 'redux-form';

import { renderWithForm, checkLabel, checkTextInput, checkSelect, checkButton } from '../../../../test-utils';
import AgencySearch from '../AgencySearch';

const fields = [
  {
    name: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agency',
    options: ['Agent Search', 'Agency Search']
  },
  {
    name: 'agencyCode',
    type: 'text',
    label: 'Agency ID',
    placeholder: 'Agency ID Search',
    data: '1234'
  },
  {
    name: 'displayName',
    type: 'text',
    label: 'Agency Name',
    placeholder: 'Agency Name Search',
    data: 'Randall Tex Cobb'
  },
  {
    name: 'address',
    type: 'text',
    label: 'Agency Address',
    placeholder: 'Agency Address Search',
    data: '1234 Mulholland Drive'
  },
  {
    name: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholder: 'Lic No Search',
    data: '123456'
  },
  {
    name: 'fein',
    type: 'text',
    label: 'FEIN Number',
    placeholder: 'FEIN No Search',
    data: '123'
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Agency Phone Number',
    placeholder: 'Phone No Search',
    data: '(987) 655-1234'
  }
];

describe('Agency Search Testing', () => {
  const props = {
    submitting: false,
    searchTypeOptions: [
      { answer: 'agent', label: 'Agent Search' },
      { answer: 'agency', label: 'Agency Search' }
    ]
  };

  const SearchForm = reduxForm({
    form: 'SEARCH_BAR',
    initialValues: { searchType: 'agency' }
  })(AgencySearch);

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Renders and has fields and labels', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(<SearchForm {...props} />);

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholder }) => expect(getByPlaceholderText(placeholder)));
    selectFields.forEach(({ name, selected }) => expect(getByTestId(name).getAttribute('data-selected')).toEqual(selected));
  });

  it('POS:Checks that all fields are working', () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(<SearchForm {...props} />);
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field => checkTextInput(getByPlaceholderText, field));
  });

  it('POS:Agency Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, { name: 'submit', type: 'submit' });
  });
});

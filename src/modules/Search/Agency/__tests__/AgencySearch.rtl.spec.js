import React from 'react';
import { reduxForm } from 'redux-form';

import {
  renderWithForm,
  checkLabel,
  checkTextInput,
  checkSelect,
  checkButton
} from '../../../../test-utils';
import AgencySearch from '../AgencySearch';

const fields = [
  {
    dataTest: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agency',
    options: ['Agent Search', 'Agency Search']
  },
  {
    dataTest: 'agencyCode',
    type: 'text',
    label: 'Agency ID',
    placeholderText: 'Agency ID Search',
    value: '1234'
  },
  {
    dataTest: 'displayName',
    type: 'text',
    label: 'Agency Name',
    placeholderText: 'Agency Name Search',
    value: 'Randall Tex Cobb'
  },
  {
    dataTest: 'address',
    type: 'text',
    label: 'Agency Address',
    placeholderText: 'Agency Address Search',
    value: '1234 Mulholland Drive'
  },
  {
    dataTest: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholderText: 'Lic No Search',
    value: '123456'
  },
  {
    dataTest: 'fein',
    type: 'text',
    label: 'FEIN Number',
    placeholderText: 'FEIN No Search',
    value: '123'
  },
  {
    dataTest: 'phone',
    type: 'text',
    label: 'Agency Phone Number',
    placeholderText: 'Phone No Search',
    value: '(987) 655-1234'
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
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholderText }) =>
      expect(getByPlaceholderText(placeholderText))
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

  it('POS:Agency Search Button', () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);
    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
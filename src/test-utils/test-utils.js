import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, wait } from 'react-testing-library';

import rootReducer from '../state/reducers';

import { quote } from '../test-utils';

const mockStore = configureStore([thunk]);

export const defaultInitialState = {
  appState: {
    data: {}
  },
  list: {},
  search: {
    results: []
  },
  service: {
    agencies: []
  },
  error: {},
  form: {},
  policyState: {
    policy: {}
  },
  quoteState: {},
  ui: { isLoading: false },
  notes: {}
};

export const defaultInitialProps = {
  match: {
    params: { quoteNumber: '12-345-67' },
    path: '/quote/:quoteNumber'
  }
};

export const defaultQuoteWorkflowProps = {
  ...defaultInitialProps,
  history: { replace: x => x },
  location: { pathname: '' },
  isLoading: false,
  quoteData: quote,
  getQuote: () => Promise.resolve({}),
  setAppState: () => {},
  setAppError: () => {},
  getZipcodeSettings: () => Promise.resolve({}),
  getEnumsForQuoteWorkflow: () => {},
  updateQuote: () => Promise.resolve({}),
  fetchNotes: () => Promise.resolve({}),
  toggleDiary: () => {},
  fetchDiaries: () => Promise.resolve({})
};

export const renderWithReduxAndRouter = (ui, { state = defaultInitialState, store = mockStore(state) } = {}) => {
  return {
    ...render(<Router><Provider store={store}>{ui}</Provider></Router>),
    // Return our mock store, in case we want to do something with it in a test
    store,
    // Provide a function to recreate the internal wrapping of the render function
    // This is useful if we need to rerender within a test
    wrapUi: ui => <Router><Provider store={store}>{ui}</Provider></Router>
  };
};

// This function creates a real store with a form for use with ReduxForm components
export const renderWithForm = (ui, {
  state = defaultInitialState,
  store = createStore(rootReducer, state, applyMiddleware(thunk))
} = {}) => renderWithReduxAndRouter(ui, { state, store });

const parseQueryType = (query, field, queryOptions) => {
  // We determine which field value to use based on query name
  const queryName = query.name.replace(/bound /g, '');
  switch (queryName) {
  case 'getByTestId':
    return query(field.name, queryOptions);
  case 'getByText':
    return query(field.text, queryOptions);
  case 'getByLabelText':
    return query(field.label, queryOptions);
  case 'getByPlaceholderText':
    return(query(field.placeholder, queryOptions));
  default:
    return query(field.name, queryOptions);
  }
};

export const checkLabel = (query, { name = '', text = '', label }, queryOptions) =>
  expect(parseQueryType(query, { name: `${name}_label`, text, label }, queryOptions)).toHaveTextContent(label);

export const checkError = (query, { name = '', text = '', label = '', error = 'Field Required' } = {}, queryOptions) =>
  expect(parseQueryType(query, { name: `${name}_error`, text, label, error }, queryOptions)).toHaveTextContent(error);

export const checkTextInput = (query, field, queryOptions) => {
  const input = parseQueryType(query, field, queryOptions);
  fireEvent.change(input, { target: { value: field.data }});
  expect(input.value).toBe(field.data);
};

export const checkSelect = (query, field, queryOptions) => {
  const select = parseQueryType(query, field, queryOptions);
  field.values && field.values.forEach(value => {
    fireEvent.change(select, { target: { value }});
    expect(select.getAttribute('data-selected')).toEqual(value);
  });
};

export const submitForm = (query, button = /submit/) => fireEvent.click(query(button));

export const clearText = (query, field) => fireEvent.change(parseQueryType(query, field), { target: { value: '' }});

export const checkRadio = (
  query,
  { name = '', label = '', values },
  // Account for the same answer text appearing in multiple questions and select only current question
  queryOptions = { selector: `[for="${name}"] span` }
) => {
  values.forEach(value => {
    // Get the option to select and click it
    const selectedOption = parseQueryType(query, { name: `${name}_${value}`, text: value, label }, queryOptions);
    fireEvent.click(selectedOption);
    // Expect the parent wrapper to be selected
    expect(selectedOption.parentNode.className).toEqual('label-segmented selected');
    // Expect all other values' parents to be unchecked
    values.filter(uncheckedValue => value !== uncheckedValue)
      .forEach(uncheckedValue => expect(
        parseQueryType(query, { name: `${name}_${uncheckedValue}`, text: uncheckedValue, label }, queryOptions).parentNode.className)
        .toEqual('label-segmented')
      );
  });
};

export const checkButton = (query, field, queryOptions) => {
  const button = parseQueryType(query, field, queryOptions);
  expect(button.getAttribute('type')).toEqual(field.type || 'button');
  // Find the first icon element and, if it exists, check that it's classname is the icon value in the field, or the search default.
  const iconElement = Object.values(button.childNodes).find(node => node.tagName === 'I');
  iconElement && expect(iconElement.className).toEqual(field.icon || 'fa fa-search');
};

export const checkHeader = (query, field, queryOptions) => {
  const header = parseQueryType(query, field, queryOptions);
  expect(header).toHaveTextContent(field.text);
  if (field.icon) {
    // Find the first icon element and check that it's classname is the icon value in the field
    const iconElement = Object.values(header.childNodes).find(node => node.tagName === 'I');
    expect(iconElement.className).toEqual(field.icon);
  }
};

export const checkStaticField = (query, field, queryOptions) =>
  expect(parseQueryType(query, field, queryOptions)).toBeDisabled();

export const checkOutput = (query, field) => {
  const input = parseQueryType(query, field);
  expect(input.nextSibling).toHaveTextContent(field.output.label);
  expect(input.nextSibling.nextSibling).toHaveTextContent(field.output.value);
};

// This function is used to verify specific submit errors for one field as well
export const verifyForm = (query, baseFields = [], fieldsLeftBlank = [], button) => {
  // Clears all text
  [...baseFields, ...fieldsLeftBlank].forEach(field => clearText(query, field));
  // Fills all fields out not in fieldsLeftBlank array based on 'data' key
  baseFields.filter(field => fieldsLeftBlank.indexOf(field) === -1)
    .forEach(field => fireEvent.change(parseQueryType(query, field), { target: { value: field.data }}));
  // Submit form
  submitForm(query, button);
  // Expect errors to exist on blank fields
  // or if there are no blank fields, then we check for errors on base fields
  // which will generally not be 'Field Required' errors
  fieldsLeftBlank.length ?
    fieldsLeftBlank.forEach(field => checkError(query, field)) : baseFields.forEach(field => checkError(query, field));
};

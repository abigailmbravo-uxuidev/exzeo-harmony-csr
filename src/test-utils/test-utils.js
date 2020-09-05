import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';

import rootReducer from '../state/reducers';

import {
  defaultInitialState,
  defaultAuth,
  defaultDiaries
} from './defaultPropsAndState';
import { Auth0Context } from '../context/auth-context';
import { UserContext } from '../context/user-context';
import { DiariesContext } from '../context/diaries-context';

const mockStore = configureStore([thunk]);

export const customRender = (
  ui,
  {
    auth = defaultAuth,
    diaries = defaultDiaries,
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    state = defaultInitialState,
    store = createStore(rootReducer, state, applyMiddleware(thunk))
  } = {}
) => ({
  ...render(
    <Router history={history}>
      <Provider store={store}>
        <Auth0Context.Provider value={auth}>
          <UserContext.Provider value={auth.userProfile}>
            <DiariesContext.Provider value={diaries}>
              {ui}
            </DiariesContext.Provider>
          </UserContext.Provider>
        </Auth0Context.Provider>
      </Provider>
    </Router>
  )
});
export * from '@testing-library/react';
export { customRender as render };

/**
 * @deprecated
 * @param {Object} ui - React component to be Rendered
 * @param {Object} [{ state = defaultInitialState, store = mockStore(state) }={}] - The state and store, both optional, to be used.
 * If state is provided but store is not, store will be mocked from the given state.
 */
export const renderWithReduxAndRouter = (
  ui,
  { state = defaultInitialState, store = mockStore(state) } = {}
) => ({
  ...render(
    <BrowserRouter>
      <Provider store={store}>{ui}</Provider>
    </BrowserRouter>
  ),
  // Return our mock store, in case we want to do something with it in a test
  store,
  // Provide a function to recreate the internal wrapping of the render function
  // This is useful if we need to rerender within a test
  wrapUi: ui => (
    <BrowserRouter>
      <Provider store={store}>{ui}</Provider>
    </BrowserRouter>
  )
});

/**
 * This function creates a real store with a form for use with ReduxForm components
 * @deprecated
 * @param ui
 * @param state
 * @param store
 * @returns {{}}
 */
export const renderWithForm = (
  ui,
  {
    state = defaultInitialState,
    store = createStore(rootReducer, state, applyMiddleware(thunk))
  } = {}
) => renderWithReduxAndRouter(ui, { state, store });

/**
 * A function to handle your query and your field and find the correct DOM element.
 * This way the check functions below can handle any query type from @testing-library/react.
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field - The field object to find and test.
 * @returns {Object} Node - The DOM node found via the query.
 */
const parseQueryType = (query, field) => {
  // We determine which field value to use based on query name
  const queryName = query.name.replace(/bound /g, '');

  if (queryName.includes('ByTestId')) return query(field.dataTest);
  if (queryName.includes('ByText')) return query(field.text);
  if (queryName.includes('ByLabelText')) return query(field.label);
  if (queryName.includes('ByPlaceholderText'))
    return query(field.placeholderText);
  else return query(field.dataTest);
};

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {RegExp} [button=/submit/] - The regex used to find the button.
 */
export const submitForm = (query, button = /submit/) =>
  fireEvent.click(query(button));

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field - The field object to find and test.
 */
export const clearText = (query, field) =>
  fireEvent.change(parseQueryType(query, field), { target: { value: '' } });

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field [{ dataTest, error = 'Field Required', ...rest }] - The field object to find and test.
 */
export const checkError = (
  query,
  { dataTest, error = 'Field Required', ...rest } = {}
) =>
  expect(
    parseQueryType(query, { ...rest, dataTest: `${dataTest}_error`, error })
  ).toHaveTextContent(error);

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { dataTest, label, ...rest } - The field object to find and test.
 */
export const checkLabel = (query, { dataTest, label, ...rest }) =>
  expect(
    parseQueryType(query, { ...rest, dataTest: `${dataTest}_label`, label })
  ).toHaveTextContent(label);

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { defaultValue, value, ...rest } - The field object to find and test.
 */
export const checkTextInput = (query, { defaultValue, value, ...rest }) => {
  const input = parseQueryType(query, { ...rest });
  defaultValue && expect(input.value).toBe(defaultValue);
  fireEvent.change(input, { target: { value } });
  expect(input.value).toBe(value);
};

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { defaultValue, values = [], ...rest } - The field object to find and test.
 */
export const checkSelect = (query, { defaultValue, values = [], ...rest }) => {
  const select = parseQueryType(query, { ...rest });
  if (defaultValue) {
    expect(select.getAttribute('data-selected')).toEqual(defaultValue.value);
    expect(
      select.querySelector(`option[value="${defaultValue.value}"]`).textContent
    ).toEqual(defaultValue.label);
  }
  values.forEach(({ value, label = value }) => {
    fireEvent.change(select, { target: { value } });
    expect(select.getAttribute('data-selected')).toEqual(value);
    expect(
      select.querySelector(`option[value="${value}"]`).textContent
    ).toEqual(label);
  });
};

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { dataTest = '', text = '', label = '', values } - The field object to find and test.
 */
export const checkRadio = (
  query,
  {
    dataTest,
    values,
    defaultValue,
    format = x => x,
    outputValues = [],
    ...rest
  }
) =>
  values.forEach((value, i) => {
    // Get the option to select
    const selectedOption = parseQueryType(query, {
      ...rest,
      dataTest: `${dataTest}_${value}`
    });
    const unselectedClass = 'label-segmented';
    const selectedClass = 'label-segmented selected';
    // Expect the value of the text is equal to the formatted value
    expect(selectedOption.textContent).toEqual(format(value));
    // If this is the default value it should be checked already, otherwise it should not be
    value === defaultValue
      ? expect(selectedOption.parentNode.className).toEqual(selectedClass)
      : expect(selectedOption.parentNode.className).toEqual(unselectedClass);

    // Click the option
    fireEvent.click(selectedOption);
    // If there is an output field, check it now
    outputValues[i] &&
      expect(
        parseQueryType(query, {
          dataTest: `${dataTest}_wrapper`
        }).querySelector('output').textContent
      ).toEqual(outputValues[i]);
    // Expect the parent wrapper to be selected
    expect(selectedOption.parentNode.className).toEqual(selectedClass);
    // Expect all other values' parents to be unchecked
    values
      .filter(uncheckedValue => value !== uncheckedValue)
      .forEach(uncheckedValue =>
        expect(
          parseQueryType(query, {
            ...rest,
            dataTest: `${dataTest}_${uncheckedValue}`
          }).parentNode.className
        ).toEqual(unselectedClass)
      );
  });

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { dataTest, icon = false, text, ...rest } - The field object to find and test.
 */
export const checkHeader = (
  query,
  { dataTest, icon = false, text, ...rest }
) => {
  const header = parseQueryType(query, { ...rest, dataTest, text });
  expect(header).toHaveTextContent(text);
  if (icon) {
    // find the first icon element and check that it's classname is the icon value in the field
    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual(icon);
  }
};

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} button { dataTest, text, type, ...rest } = {} - The button object to find and test.
 */
export const checkButton = (
  query,
  {
    dataTest = 'submit',
    text = 'Update',
    type = 'button',
    icon = 'fa fa-search',
    ...rest
  } = {}
) => {
  const button = parseQueryType(query, { ...rest, dataTest, text });
  expect(button.getAttribute('type')).toEqual(type);
  expect(button.textContent).toEqual(text);
  // Find the first icon element and, if it exists, check that it's classname is the icon value in the field, or the search default.
  const iconElement = Object.values(button.childNodes).find(
    node => node.tagName === 'I'
  );
  iconElement && expect(iconElement.className).toEqual(icon);
};

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field - The field object to find and test.
 */
export const checkStaticField = (query, field) =>
  expect(parseQueryType(query, field)).toBeDisabled();

/**
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Object} field { output, ...rest } - The field object to find and test.
 */
export const checkOutput = (query, { output, ...rest }) => {
  const input = parseQueryType(query, { ...rest });
  expect(input.nextSibling).toHaveTextContent(output.label);
  expect(input.nextSibling.nextSibling).toHaveTextContent(output.value);
};

/**
 * This function is used to verify specific submit errors for one field as well
 * @param {Object} query - The function from @testing-library/react to be used.
 * @param {Array} [baseFields=[]] - Array of field objects to fill out.
 * @param {Array} [fieldsLeftBlank=[]] - Array of field objects to leave blank.
 * @param {regex|string} button - The regex/string used to find the button.
 */
export const verifyForm = (
  query,
  baseFields = [],
  fieldsLeftBlank = [],
  button
) => {
  // Clears all text
  [...baseFields, ...fieldsLeftBlank].forEach(field => clearText(query, field));
  // Fills all fields out not in fieldsLeftBlank array based on 'data' key
  baseFields
    .filter(field => fieldsLeftBlank.indexOf(field) === -1)
    .forEach(({ value, ...rest }) =>
      fireEvent.change(parseQueryType(query, { ...rest }), {
        target: { value }
      })
    );
  // Submit form
  submitForm(query, button);
  // Expect errors to exist on blank fields
  // or if there are no blank fields, then we check for errors on base fields
  // which will generally not be 'Field Required' errors
  fieldsLeftBlank.length
    ? fieldsLeftBlank.forEach(field => checkError(query, field))
    : baseFields.forEach(field => checkError(query, field));
};

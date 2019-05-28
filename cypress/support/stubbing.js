import _ from 'lodash';

import { stub } from '../helpers';

/**
 * Modify a default fixture with new data and restub the route
 * @param {string} fileRoute - The file path to the fixture file
 * @param {Object} values - The new data we're merging in. Should be in form [path, value] or [[path, value], [path2, value2], ...].
 * @param {bool} useConfig - Whether or not the stubbing is turned on or off by the config file.
 * @param {string} url - Optional parameter to give a route other than the standard one for our stubs. Used if your filepath is heterodox to function.
 */
Cypress.Commands.add('setFx', (filePath, values, useConfig = false, url) => {
  // GUARD
  if (!values || values.length === 0) return;

  cy.fixture(filePath).then(fx => {
    // Split the path and remove the "stubs/" filepath to create our route
    const routes = filePath.split('/').slice(1);
    // If no route for the fiture is given we assume one of two usual scenarios
    if (!url) {
      url = routes.length === 1 ? `/svc?${routes[0]}` : `/cg/${routes[0]}?${routes[1]}`;
    };
    // Clone our fixture -- do not modify in place
    const response = _.cloneDeep(fx);
    // If the value path does not have extra object route info, and we are in the most commonly
    // stubbed route, we prepend it.
    const addPathPrefix = path => routes[1] === 'csrGetQuoteWithUnderwriting' && !path.includes('.') ? `data.previousTask.value.result.${path}` : path;
    // Check if we have one value in our array or multiple (array of arrays)
    if (typeof values[0] === 'string') {
      _.set(response, addPathPrefix(values[0]), values[1]);
    } else {
      values.forEach(([path, value]) => _.set(response, addPathPrefix(path), value));
    };
    // Stub our new route optionally using the config variable to toggle stubbing
    cy.route('POST', url, useConfig ? stub(response) : response)
      // Convention is naming the route the query param
      .as(routes[routes.length - 1]);
  });
});

/* eslint no-restricted-globals: 0 */

const { join } = require('path');

const isStyleLoaded = $head => $head.find('#cypress-dark').length > 0;
before(() => {
  console.log('parent.window.document.body is', parent.window.document.body);
  const $head = Cypress.$(parent.window.document.head);
  if (isStyleLoaded($head)) {
    return;
  };

  const themeFilename = join(__dirname, 'default.css');
  cy.readFile(themeFilename, { log: false }).then(css => {
    $head.append(
      `<style type="text/css" id="cypress-dark">\n${css}</style>`
    );
  });
});

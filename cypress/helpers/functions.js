// File for you to put useful functions that should not be part of the Cypress object;
//
/**
 * Route stubbing -- if fixtures are off, we use an empty function which Cypress interperets to mean the server response
 * @param {Object} fx
 */
export const stub = path => Cypress.env('FIXTURES') ? `fx:stubs/${path}` : () => {};

// Route stubbing -- if fixtures are off, we use an empty function which Cypress interperets to mean the server response
export const stub = fx => Cypress.env('FIXTURES') ? fx : () => {};

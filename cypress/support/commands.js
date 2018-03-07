Cypress.Cookies.debug(true) 
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit('http://devcsr.harmony-ins.com:8383/logout');
  cy
    .get('button').click()
    .get('form input[name="username"]').clear().type(email)
    .get('form input[name="password"]').clear().type(password)
    .get('form button').click();
});

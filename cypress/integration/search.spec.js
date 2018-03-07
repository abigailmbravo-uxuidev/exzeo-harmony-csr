describe('Search CSR', () => {
  it('Logs in', () => {
    cy
      .login('tticcsr', 'Password1')
      .get('#SearchBar').should('be.visible');
  });
})
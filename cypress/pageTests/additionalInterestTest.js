export default () =>
  cy
    .checkQuoteState('Application Started')
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.result.additionalInterests[0].name1).to.eq('BATMAN');
      expect(response.body.result.additionalInterests[0].name2).to.eq('ROBIN');
    });

// Functions used to navigate each tab of the app
// import { envelopeIdCheck } from '../../helpers/requests';
import { envelopeIdCheck, manualBindPolicy } from '../helpers';
import {
  user,
  pH1,
  shareQuote,
  addInsured,
  unQuestionsHO3,
  unQuestionsAF3,
  unQuestionsBAD,
  coverageHO3,
  coverageAF3
} from '../fixtures';

export const navigateThroughNewQuote = (
  product = 'HO3',
  address = user.address1
) => {
  return (
    cy
      .task('log', 'Navigating through Quote')
      .findDataTag('searchType')
      .select('address')
      .findDataTag('product')
      .select(product)
      .findDataTag('address')
      .type(address)
      .clickSubmit()
      .wait('@fetchAddresses')
      // This makes it so we don't open up a new window
      .findDataTag(address)
      .then($a => {
        $a.prop('onclick', () => cy.visit($a.prop('dataset').url));
        cy.wait('@createQuote')
          .wait('@retrieveQuote')
          .wait('@getZipcodeSettings');
      })
  );
};

export const fillOutCoverage = (customerInfo = pH1) => {
  return cy
    .task('log', 'Filling out Coverage')
    .goToNav('coverage')
    .wrap(Object.entries(customerInfo))
    .each(([field, value]) =>
      cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
    )
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      // TODO we need to assert something about this response, preferably the quoteInputState like we do in the other tests.
      expect(response.body.status).to.equal(200);
    });
};

export const changeCoverageAndAgency = (coverage = coverageHO3) => {
  return cy
    .task('log', 'Changing coverage values')
    .goToNav('coverage')
    .get("[data-test*='Premium'] dd")
    .then($prem => {
      // remove any commas or spaces
      const premium = $prem.text().replace(/\D/g, '');

      cy.get("div[data-test='agencyCode_wrapper'] input[id*='react-s']")
        .click({ force: true })
        .chooseReactSelectOption('agencyCode_wrapper', 20003)
        .get("div[data-test='agentCode_wrapper'] input[id*='react-s']")
        .click({ force: true })
        .chooseReactSelectOption('agentCode_wrapper', 60586)
        .wrap(Object.entries(coverage))
        .each(([field, value]) => {
          cy.findDataTag(field).type(`{selectall}{backspace}${value}`, {
            force: true
          });
        })
        .clickSubmit();
      cy.wait('@updateQuote').then(({ response }) => {
        expect(response.body.result.rating.totalPremium).not.to.eq(
          premium,
          'Difference in premium'
        );
        expect(response.body.result.agencyCode).to.eq(20003, 'Agency Code');
      });
    });
};

export const fillOutUnderwriting = (
  questions = unQuestionsHO3,
  expectedQuoteState = 'Quote Qualified'
) => {
  return cy
    .task('log', 'Filling out Underwriting')
    .goToNav('underwriting')
    .wait('@getUnderwritingQuestions')
    .then(({ response }) => {
      expect(response.body.status).to.equal(
        200,
        'Underwriting Questions request'
      );
    })
    .wrap(Object.entries(questions))
    .each(([name, value]) =>
      cy.findDataTag(`${name}_${value}`).click({ force: true })
    )
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.result.quoteState).to.equal(
        expectedQuoteState,
        'Quote State'
      );
    });
};

export const fillOutAdditionalInterests = (
  additionalInterests = addInsured
) => {
  return cy
    .task('log', 'Filling out AIs')
    .goToNav('additionalInterests')
    .findDataTag('additionalInsured')
    .click({ force: true })
    .findDataTag('name1')
    .should('be.visible')
    .wrap(Object.entries(additionalInterests))
    .each(([field, value]) =>
      cy
        .findDataTag(`${field}`)
        .type(`{selectall}{backspace}${value}`, { force: true })
    )
    .findDataTag('ai-modal-submit')
    .click({ force: true })
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.result.additionalInterests.length).to.be.at.least(1);
      expect(response.body.result.additionalInterests[0].name1).to.eq('BATMAN');
      expect(response.body.result.additionalInterests[0].name2).to.eq('ROBIN');
    });
};

export const fillOutMailingBilling = () => {
  cy.task('log', 'Filling out Mailing Billing')
    .goToNav('billing')
    .findDataTag('sameAsPropertyAddress')
    .click('left')
    .findDataTag('billToId')
    .select('Additional Insured: BATMAN ROBIN', { force: true })
    .findDataTag('billPlan_Annual')
    .click({ force: true })
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      // TODO we need to assert something about this response, preferably the quoteInputState like we do in the other tests.
      expect(response.body.status).to.equal(200);
      cy.wrap(response.body.result.quoteNumber).as('quoteNumber');
    });
};

export const fillOutNotesFiles = () => {
  return cy.task('log', 'Filling out Notes and Files').goToNav('notes');
};

export const fillOutSummary = () => {
  return cy.task('log', 'Filling out Summary').goToNav('summary');
};

export const sendQuote = (data = shareQuote) => {
  return cy
    .wrap(Object.entries(data))
    .each(([field, value]) => {
      cy.findDataTag(field).type(`{selectall}{backspace}${value}`, {
        force: true
      });
    })
    .findDataTag('share-footer-submit')
    .click({ force: true })
    .wait('@shareQuote')
    .then(({ response }) => {
      expect(response.body.message).to.equal('success');
    });
};

export const fillOutApplication = () => {
  return cy.task('log', 'Filling out Application Page').goToNav('application');
};

export const navigateThroughDocusign = () => {
  return cy
    .task('log', "Navigating through 'Send to Docusign'")
    .clickSubmit('body', 'send-application')
    .wait('@verifyQuote')
    .then(({ response }) => {
      expect(response.body.result.quoteState).to.equal(
        'Application Ready',
        'Quote State'
      );
    })
    .checkQuoteState('Application Ready')
    .clickSubmit('#sendApplicationForm', 'modal-submit')
    .wait('@sendApplication')
    .then(({ response }) => {
      expect(response.body.result.quoteState).to.equal(
        'Application Ready',
        'Quote State'
      );
      cy.wrap(response.body.result).as('submittedQuote');
    })
    .get('button[data-test="send-application"]')
    .should('be.disabled')
    .get('@submittedQuote')
    .then(quote => {
      const token = localStorage.getItem('id_token');
      const apiUrl = Cypress.env('API_URL') + '/svc';
      const { quoteNumber } = quote;
      envelopeIdCheck(quoteNumber, apiUrl, token).then(response => {
        expect(response.body.result.envelopeId).to.not.be.empty;
      });
      manualBindPolicy(quoteNumber, apiUrl, token).then(response => {
        cy.wrap(response.body.result.transaction.policyNumber).as(
          'policyNumber'
        );
      });
    });
};

export const searchPolicy = () => {
  return cy
    .task('log', 'Searching for the Policy')
    .get('#logo')
    .click()
    .findDataTag('searchType')
    .select('policy');
  cy.get('@policyNumber').then(polNum => {
    cy.findDataTag('policyNumber')
      .type(polNum)
      .clickSubmit()
      .wait('@fetchPolicies')
      .then(({ response }) => {
        expect(response.body.totalNumberOfRecords).to.equal(1);
      });
    cy.get('.policy-no')
      .invoke('text')
      .then(number => {
        expect(number).to.include(polNum);
      });
  });
};

export const searchQoute = () => {
  return cy
    .task('log', 'Searching for the Quote')
    .get('#logo')
    .click()
    .findDataTag('searchType')
    .select('quote');
  cy.get('@quoteNumber').then(quoteNum => {
    cy.findDataTag('quoteNumber')
      .type(quoteNum)
      .clickSubmit()
      .wait('@fetchQuotes')
      .then(({ response }) => {
        expect(response.body.result.totalNumberOfRecords).to.equal(1);
      });
    cy.get('.quote-no')
      .invoke('text')
      .then(number => {
        expect(number).to.include(quoteNum);
      });
  });
};

export const veriFyDiary = () => {
  return cy
    .task('log', 'Navigate throough Diary verification')
    .get('@diaryText')
    .then(diaryText => {
      cy.goToNav('notes')
        .get('button')
        .contains('Diaries')
        .click()
        .get('td[class="message"]')
        .should('have.text', diaryText);
    });
};

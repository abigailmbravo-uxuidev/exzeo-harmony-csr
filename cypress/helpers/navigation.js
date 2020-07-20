import { envelopeIdCheck, manualBindPolicy, getToken } from '../helpers';
import {
  user,
  pH1,
  shareQuote,
  addInsured,
  unQuestions,
  agencyDetails,
  coverage as coverageValues
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
      .then(({ response }) => {
        expect(response.body.status).to.equal(200);
      })
      // This makes it so we don't open up a new window
      .findDataTag(address)
      .then($a => {
        const url = $a.prop('dataset').url;
        cy.window().then(win => {
          win.__rrHistory.push(url);
          cy.wait('@createQuote')
            .wait('@retrieveQuote')
            .wait('@getZipcodeSettings');
        });
      })
      .findDataTag('propertyAddressDetail')
      .contains(address)
      .should('contain.text', address)
  );
};

export const fillOutCoverage = (customerInfo = pH1) => {
  return cy
    .task('log', 'Filling out Coverage')
    .goToNav('coverage')
    .findDataTag('Produced By')
    .should('have.text', 'Produced By')
    .wrap(Object.entries(customerInfo))
    .each(([field, value]) =>
      cy.findDataTag(field).type(`{selectall}{backspace}${value}`)
    )
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
      cy.contains(customerInfo['policyHolders[0].firstName']).should(
        'contain.text',
        `${customerInfo['policyHolders[0].firstName']} ${customerInfo['policyHolders[0].lastName']}`
      );
    });
};

export const changeCoverageAndAgency = (
  coverage = coverageValues,
  agency = agencyDetails
) => {
  return cy
    .task('log', 'Changing coverage values')
    .goToNav('coverage')
    .findDataTag('Produced By')
    .should('have.text', 'Produced By')
    .get('[data-test="currentPremiumDetail"] dd')
    .then($prem => {
      cy.wrap($prem.text()).as('initPremium');
    })
    .get("div[data-test='agencyCode_wrapper'] input[id*='react-s']")
    .click({ force: true })
    .chooseReactSelectOption('agencyCode_wrapper', agency.agencyDetails.code)
    .get("div[data-test='agentCode_wrapper'] input[id*='react-s']")
    .click({ force: true })
    .chooseReactSelectOption('agentCode_wrapper', agency.agentDetails.code)
    .wrap(Object.entries(coverage))
    .each(([field, value]) => {
      cy.findDataTag(field).type(`{selectall}{backspace}${value}`, {
        force: true
      });
    })
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      -expect(response.body.status).to.equal(200);
    })
    .get('@initPremium')
    .then(premium => {
      cy.findDataTag('currentPremiumDetail').within(() => {
        cy.get('dd').should('not.have.text', premium);
      });
    })
    .findDataTag('agencyCode_wrapper')
    .contains(agency.agencyDetails.code)
    .should(
      'have.text',
      `${agency.agencyDetails.code}: ${agency.agencyDetails.name}`
    )
    .findDataTag('agentCode_wrapper')
    .contains(agency.agentDetails.code)
    .should(
      'have.text',
      `${agency.agentDetails.code}: ${agency.agentDetails.name}`
    );
};

export const fillOutUnderwriting = (
  questions = unQuestions,
  expectedQuoteState = 'Quote Qualified'
) => {
  return cy
    .task('log', 'Filling out Underwriting')
    .goToNav('underwriting')
    .findDataTag('Underwriting Questions')
    .should('have.text', 'Underwriting Questions')
    .wait('@getUnderwritingQuestions')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    })
    .wrap(Object.entries(questions))
    .each(([name, value]) =>
      cy.findDataTag(`${name}_${value}`).click({ force: true })
    )
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    })
    .findDataTag('quoteDetails')
    .contains(expectedQuoteState)
    .should('have.text', expectedQuoteState);
};

export const fillOutAdditionalInterests = (
  additionalInterests = addInsured
) => {
  return cy
    .task('log', 'Filling out AIs')
    .goToNav('additionalInterests')
    .findDataTag('Additional Interests')
    .should('have.text', 'Additional Interests')
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
      expect(response.body.status).to.equal(200);
    })
    .findDataTag('Additional Insured-0')
    .contains(additionalInterests.name1)
    .should(
      'contain.text',
      `${additionalInterests.name1} ${additionalInterests.name2}`
    );
};

export const fillOutMailingBilling = (address = user.address1) => {
  return cy
    .task('log', 'Filling out Mailing Billing')
    .goToNav('billing')
    .wait('@getBillingOptions')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    })
    .findDataTag('Mailing Address')
    .should('have.text', 'Mailing Address')
    .findDataTag('sameAsPropertyAddress')
    .click('left')
    .findDataTag('billToId')
    .select('Additional Insured: BATMAN ROBIN', { force: true })
    .findDataTag('billPlan_Annual')
    .click({ force: true })
    .clickSubmit()
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
      cy.wrap(response.body.result.quoteNumber).as('quoteNumber');
    })
    .findDataTag('policyHolderMailingAddress.address1')
    .should('have.value', address);
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
      expect(response.body.status).to.equal(200);
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
      expect(response.body.status).to.equal(200);
    })
    .findDataTag('quoteDetails')
    .contains('Application Ready')
    .should('have.text', 'Application Ready')
    .checkQuoteState('Application Ready')
    .clickSubmit('#sendApplicationForm', 'modal-submit')
    .wait('@sendApplication')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
      cy.wrap(response.body.result).as('submittedQuote');
    })
    .findDataTag('quoteDetails')
    .contains('Application Ready')
    .should('have.text', 'Application Ready')
    .get('button[data-test="send-application"]')
    .should('be.disabled')
    .get('@submittedQuote')
    .then(quote => {
      getToken().then(response => {
        const { quoteNumber } = quote;
        const token = response.body.access_token;
        const apiUrl = `${Cypress.env('API_URL')}/svc`;

        envelopeIdCheck(quoteNumber, apiUrl, token).then(response => {
          expect(response.body.result.envelopeId).to.not.be.empty;
        });
        manualBindPolicy(quoteNumber, apiUrl, token).then(response => {
          cy.wrap(response.body.result.transaction.policyNumber).as(
            'policyNumber'
          );
        });
      });
    });
};

export const searchPolicy = () => {
  return cy
    .task('log', 'Searching for the Policy')
    .get('#logo')
    .click()
    .findDataTag('searchType')
    .select('policy')
    .get('@policyNumber')
    .then(polNum => {
      cy.findDataTag('policyNumber')
        .type(polNum)
        .clickSubmit()
        .wait('@fetchPolicies')
        .then(({ response }) => {
          expect(response.body.totalNumberOfRecords).to.equal(1);
        })
        .findDataTag(polNum)
        .contains(polNum)
        .should('contain.text', polNum);
    });
};

export const searchQoute = () => {
  return cy
    .task('log', 'Searching for the Quote')
    .window()
    .then(win => {
      win.__rrHistory.push('/');
    })
    .findDataTag('searchType')
    .select('quote')
    .get('@quoteNumber')
    .then(quoteNum => {
      cy.findDataTag('quoteNumber')
        .type(quoteNum)
        .clickSubmit()
        .wait('@fetchQuotes')
        .then(({ response }) => {
          expect(response.body.status).to.equal(200);
        })
        .findDataTag(quoteNum)
        .contains(quoteNum)
        .should('contain.text', quoteNum);
    });
};

export const searchDiary = () => {
  return cy
    .task('log', 'Searching for the Diary')
    .get('@diaryText')
    .then(diaryText => {
      cy.window()
        .then(win => {
          win.__rrHistory.push('/');
        })
        .findDataTag('diaries-link')
        .click()
        .get('div')
        .contains(diaryText)
        .should('have.text', diaryText);
    });
};

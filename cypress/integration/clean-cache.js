/// <reference types="cypress" />
context('Actions', () => {
  it('.type() - type into a DOM element', () => {
    const cacheUrl = Cypress.env('CACHE_URL')

    cy.visit('https://dashboard.prerender.io/login')

    cy.get('#exampleInputEmail1')
      .type(Cypress.env('USERNAME'), {force: true})

    // login
    cy.get('#exampleInputPassword1')
      .type(Cypress.env('PASSWORD'))
    cy.get('.btn[type=submit]').click();

    // add url
    cy.get('.btn.btn-default.ng-scope').contains(new RegExp(/^Add URL$/)).click();
    cy.get('input[ng-model=url]').type(cacheUrl);
    cy.get('.btn.btn-default').contains(new RegExp(/^Add URL$/))
      .click();

    // search
    cy.get('input.form-control.ng-pristine.ng-valid')
      .type(cacheUrl)
    cy.get('.btn.btn-default[type=submit]').click()

    // delete
    cy.get(`a[href="${cacheUrl}"]`)
      // .contains(cacheUrl)
      .parent()
      .parent()
      .children('.checks')
      .children('input.ng-pristine.ng-valid')
      .click()
    cy.get('button.btn.btn-default.ng-binding').contains('Remove 1 selected pages')
      .click();

    // add url again
    cy.get('.btn.btn-default.ng-scope').contains(new RegExp(/^Add URL$/)).click();
    cy.get('input[ng-model=url]').type(cacheUrl);
    cy.get('.btn.btn-default').contains(new RegExp(/^Add URL$/))
      .click();

    // assert
    cy.get('.btn.btn-default[type=submit]').click()
    cy.get(`a[href="${cacheUrl}"]`).should('be.visible')

    expect(true).to.equal(true)
  })
})

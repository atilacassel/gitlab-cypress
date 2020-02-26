describe('Reopen a closed issue', () => {
  beforeEach(() => {
    cy.gui_login()
    cy.api_createIssue()
      .then(issueResponse => cy.api_getAllProjects()
        .then(projectsResponse => {
          cy.visit(`${Cypress.env('user_name')}/${projectsResponse.body[0].name}/issues/${issueResponse.body.iid}`)
          cy.get('.d-none.btn-close').click()
        }))
  })

  after(() => cy.api_deleteProjects())

  it('successfully', () => {
    cy.get('[data-qa-selector="reopen_issue_button"]').click()

    cy.get('.status-box-open')
      .should('be.visible')
      .and('contain', 'Open')
  })
})

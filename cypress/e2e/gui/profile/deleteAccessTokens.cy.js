describe("Access Token's clean up", () => {
  beforeEach(() => cy.sessionLogin())

  it('deletes all access tokens', () => {
    cy.gui_deleteAccessTokens()
  })
})

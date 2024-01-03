const newUser = require("../../../fixtures/sampleUser");
const { username: newUserName, password: newUserPassword } = newUser;
const defaultUser = Cypress.env("user_name");

describe("Issue", { env: { snapshotOnly: true } }, () => {
  beforeEach(() => {
    cy.log("--- Pre-conditions ---");
    cy.log("1. Delete all users and projects to start in a clean state");
    cy.deleteAllUsersButRoot();
    cy.api_deleteProjects();

    cy.log("2. Create a brand new user");
    cy.api_createUser(newUser); //Parece não estar criando usuário - Ver Walmyr

    cy.log(
      `3. Create a new issue (and by consequence a new project) for the ${defaultUser} user`
    );
    cy.api_createIssue().its("body.iid").as("issueIid");

    cy.log(`4. Sign in as ${defaultUser}`);
    cy.signInAsDefaultUser();

    cy.log(`5. Add the new user to the ${defaultUser} user's project`);
    cy.api_getAllProjects().as("projects");
    cy.get("@projects")
      .its("body[0].name")
      .as("projectName")
      .then((projectName) => cy.gui_addUserToProject(newUser, projectName));
    cy.log("--- End of pre-conditions ---");
  });

  it("assign an issue to  different user", () => {
    cy.log(`1. Visit the issue as ${defaultUser} and comment on it`);
    cy.visitIssue();
  });
});

Cypress.Commands.add("visitIssue", function () {
  const { projectName, issueIid } = this;
  cy.visit(`${defaultUser}/${projectName}/issues/${issueIid}`);
});

Cypress.Commands.add("signInAsDefaultUser", () => {
  cy.sessionLogin();
});

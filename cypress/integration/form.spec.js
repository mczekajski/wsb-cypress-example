/// <reference types="Cypress /">
Cypress.config().waitForAnimations = true;
import { parametersAccountManager } from "../fixtures/parameters.js";

const registerURL = parametersAccountManager.formURL + "/register.html";
const loginURL = parametersAccountManager.formURL + "/index.html";
const loggedURL = parametersAccountManager.formURL + "/login.html";

const confirmURL = (url) => {
  cy.location().should(($loc) => {
    expect($loc.href).to.eq(url);
  });
};

describe("Form testing", () => {
  it("should open app", () => {
    cy.visit(parametersAccountManager.formURL);
  });

  it("should verify form - UI", () => {
    const { role, subtitle, buttonText, linkText } = parametersAccountManager;
    cy.verifyForm(role, subtitle, buttonText, linkText);
  });

  it("should register to APP", () => {
    const { testedLogin, testedPassword, linkText, setUpAccount } =
      parametersAccountManager;
    cy.registerToApp(testedLogin, testedPassword, linkText, setUpAccount);
  });

  it("Form login user", () => {
    cy.get('input[name="login"]').type(parametersAccountManager.testedLogin);
    cy.get('input[name="password"]').type(
      parametersAccountManager.testedPassword
    );
    cy.get("button")
      .should("have.text", parametersAccountManager.buttonText)
      .click();
    //nieobowiazakowo wait
    cy.wait(1000);

    cy.window().then(($win) => {
      expect($win.localStorage.getItem("logged")).to.eql("1");
      expect($win.localStorage.getItem("username")).to.eql(
        parametersAccountManager.testedLogin
      );
    });

    confirmURL(loggedURL);
  });

  it("should logout from Form - logout user", () => {
    cy.get("#welcomemsg").should(
      "have.text",
      "Witaj " + parametersAccountManager.testedLogin + "!"
    );
    cy.get("button")
      .should("have.text", parametersAccountManager.logoutButton)
      .click();
    confirmURL(loginURL);
    //cy.wait(2000);
  });
});

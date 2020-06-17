import {Given, When, Then} from "cypress-cucumber-preprocessor/resolveStepDefinition";


When(`I click on the {string} button`, (buttonName) => {
    cy.contains(buttonName).click()
});

Then(`I will be on the {string} page`, (pageName) => {
    cy.url().should('include', pageName)
});

Given(/^I am on the "([^"]*)" page$/,  (pageName) => {
    cy.url().should('eq', Cypress.config().baseUrl + pageName)
});

When(/^I log in with email: "([^"]*)" and password: "([^"]*)"$/, (email, password) => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"').type(password);
    cy.get('form').submit();
});

Then(/^I will be logged in$/,  () => {

});
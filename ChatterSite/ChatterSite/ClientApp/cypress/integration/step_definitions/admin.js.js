import {Given, When, Then} from "cypress-cucumber-preprocessor/resolveStepDefinition";

Given(/^I am logged in as a\(n\) "([^"]*)" with the password "([^"]*)"$/, (email, password) => {
    cy.visit("https://localhost:5003")
    cy.get('.navbar-nav').contains('Login').click()
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"').type(password);
    cy.get('form').submit();
});
Then(/^I should see a list of members including "([^"]*)"$/, function () {
    
});
When(/^I enter the new username: "([^"]*)"$/, function () {

});
When(/^password "([^"]*)" into the create user form$/, function () {

});
When(/^I enter the email "([^"]*)"$/, function () {

});
When(/^I click the "([^"]*)" button$/, function () {

});
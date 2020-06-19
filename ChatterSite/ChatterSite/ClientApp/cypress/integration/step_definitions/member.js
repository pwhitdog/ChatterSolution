import {Given, When, Then} from "cypress-cucumber-preprocessor/resolveStepDefinition";

const SITE_URL = 'https://localhost:5003/';

Given(/^I am a logged in member$/, function () {
    cy.visit(SITE_URL + `login`)
    cy.get('input[name="email"]').type("admin@nope.com");
    cy.get('input[name="password"').type("herpDerp1!");
    cy.get('form').submit();
});
Given(/^I am on my member page$/, function () {
    cy.url().should('eq', SITE_URL)
    cy.contains('Start a room')
    cy.contains('button')
});
When(/^I enter a room name$/, function () {
    cy.get('input[name="room"]').type("TEST ROOM")
});
When(/^click the "([^"]*)" button$/, function () {
    cy.get('button').click()
});
Then(/^I should have a room created to share$/, function () {

});
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

const SITE_URL = 'https://localhost:5003';

Given(/^I open the Chatter Site$/, () => {
    cy.visit(SITE_URL);
});

Then(`I see {string} in the nav bar`, (title) => {
    cy.contains('.navbar-brand', title)
});

Given(/^I am not logged in$/, () => {
    
});

Then(/^I see the login link on the nav bar$/, () => {
    cy.get('.navbar-nav').contains('Login')
});

Given(/^I need to join a room that is already made by someone else$/, () =>  {

});

When(/^I enter the room code$/, () =>  {

});

Then(/^I should be joined into the chat room$/, () =>  {

});
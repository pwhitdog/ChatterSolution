Feature: Login Page
  I want to use the login page

  Scenario: Needing to log in
    Given I open the Chatter Site
    And I am not logged in
    Then I see the login link on the nav bar

  Scenario: Opening the login page
    Given I open the Chatter Site
    And I am not logged in
    When I click on the "Login" button
    Then I will be on the "login" page
    
  Scenario: Logging in as the Admin
    Given I am on the "login" page
    When I log in with email: "admin@nope.com" and password: "herpDerp1!"
    Then I will be on the "admin" page
    
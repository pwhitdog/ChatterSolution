Feature: Admin Page
  I want to use the admin page
  
  Scenario: Seeing the list of members
    Given I am logged in as a(n) "admin@nope.com" with the password "herpDerp1!"
    Then I should see a list of members including "Molly"

  Scenario: Needing to create another member
    Given I am logged in as a(n) "admin@nope.com" with the password "herpDerp1!"
    When I enter the new username: "Steve" 
    And password "Herpderp1!" into the create user form
    And I enter the email "steve@nope.com"
    And I click the "Add Member" button
    Then I should see a list of members including "Steve"
    
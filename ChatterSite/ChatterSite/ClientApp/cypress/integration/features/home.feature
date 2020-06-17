Feature: Home Page
  I want to use the open the home page
  
  Scenario: Opening the home page
    Given I open the Chatter Site
    Then I see "Chatter Site" in the nav bar
    
  Scenario: Needing to log in
    Given I open the Chatter Site
    And I am not logged in
    Then I see the login link on the nav bar
    
  Scenario: Connecting to a created room
    Given I open the Chatter Site
    And I am not logged in
    And I need to join a room that is already made by someone else
    When I enter the room code
    And I click on the "Join Room" button
    Then I should be joined into the chat room
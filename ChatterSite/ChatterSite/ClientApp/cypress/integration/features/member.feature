Feature: Member Page
  I want to use the member page to do member things
  
  Scenario: Creating a chat room
    Given I am a logged in member
    And I am on my member page
    When I enter a room name 
    And click the "create room" button
    Then I should have a room created to share
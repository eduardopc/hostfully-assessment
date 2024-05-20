Feature: create booking

  Background: Open the booking application
    Given I am able to see the home page
    
  Scenario: Create a new booking
    When I fill all the required data
    Then a new booking is registered

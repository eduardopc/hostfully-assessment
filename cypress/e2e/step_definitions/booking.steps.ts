import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

import Booking from "../../pages/Booking";

Given("I am able to see the home page", () => {
  Booking.accessHomePage();
});

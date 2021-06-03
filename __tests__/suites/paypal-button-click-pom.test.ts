import { expect } from "chai";
import { CheckoutPage } from "../pages/checkoutPage";
import { HomePage } from "../pages/homePage";

describe("Testing Paypal buttons", () => {
  beforeEach("Open StackDemo", () => {
    browser.url("/demo/checkout/#/pattern/client");
  });

  afterEach("clear sessionstorage", () => {
    browser.execute(() => sessionStorage.clear());
  });

  it("should start payment flow when clicking on paypal button", () => {
    const homePage = new HomePage();
    homePage.clickPaypalButton();

    browser.switchWindowForCheckout(); //custom command

    const checkoutPage = new CheckoutPage();
    checkoutPage.loginUsingPhoneNumber("1234567890");

    expect(
      checkoutPage.isNotification(
        "You haven’t confirmed your mobile yet. Use your email for now."
      )
    ).to.be.true;
  });
});

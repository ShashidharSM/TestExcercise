import LoginPage from "../pageobjects/login.page.js";
import ShopPage from "../pageobjects/shop.page.js";

describe("WDIO Login flow", () => {
  it("shows an error for invalid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("candidate1", "wrong-password");
    await expect(LoginPage.loginError).toBeDisplayed();
    await expect(LoginPage.loginError).toHaveText(
      expect.stringContaining("Invalid username or password.")
    );
  });

  it("logs in with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("candidate1", "Pass123!");
    await expect(ShopPage.shopPageRoot).toBeDisplayed();
    await expect(ShopPage.welcomeText).toHaveText(expect.stringContaining("candidate1"));
  });
});

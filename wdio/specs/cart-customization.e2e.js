import LoginPage from "../pageobjects/login.page.js";
import ShopPage from "../pageobjects/shop.page.js";

describe("WDIO cart and customization", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("candidate1", "Pass123!");
    await expect(ShopPage.shopPageRoot).toBeDisplayed();
  });

  it("adds customized shirt and jeans then updates subtotal", async () => {
    await ShopPage.shirtColorSelect.selectByVisibleText("blue");
    await expect($('[data-testid="shirt-options-table"]')).toBeDisplayed();

    await ShopPage.shirtLogoSelect.selectByVisibleText("Rocket");
    await ShopPage.addShirtToCartButton.click();

    await ShopPage.jeansSizeSelect.selectByVisibleText("M");
    await ShopPage.addJeansToCartButton.click();

    await expect($('[data-testid="cart-table"]')).toHaveText(expect.stringContaining("Classic Shirt"));
    await expect($('[data-testid="cart-table"]')).toHaveText(expect.stringContaining("Logo: Rocket"));
    await expect($('[data-testid="cart-table"]')).toHaveText(expect.stringContaining("Slim Jeans"));
    await expect(ShopPage.subtotalText).toHaveText(expect.stringContaining("75.98"));
  });
});

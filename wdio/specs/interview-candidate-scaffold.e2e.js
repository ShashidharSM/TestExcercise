import LoginPage from "../pageobjects/login.page.js";
import ShopPage from "../pageobjects/shop.page.js";

describe("WDIO interview scaffold", () => {
  beforeEach(async () => {
    await LoginPage.open({ exerciseMode: true });
    await LoginPage.login("candidate1", "Pass123!");
    await expect(ShopPage.shopPageRoot).toBeDisplayed();
  });

  it.skip("TODO: fix flaky hover customization test", async () => {
    // TODO candidate:
    // 1) Reveal hover actions in a stable way.
    // 2) Click shirt customize action.
    // 3) Assert logo table/editor is visible.
    await expect(ShopPage.exerciseBadge).toBeDisplayed();
  });

  it.skip("TODO: verify remove behavior removes the clicked row", async () => {
    // TODO candidate:
    // 1) Add at least 2 products.
    // 2) Remove second row.
    // 3) Assert only the target row is removed.
    await expect($('[data-testid="cart-table"]')).toBeDisplayed();
  });

  it.skip("TODO: verify subtotal precision keeps cents", async () => {
    // TODO candidate:
    // 1) Add two priced products.
    // 2) Assert subtotal equals expected decimal total.
    await expect(ShopPage.subtotalText).toBeDisplayed();
  });
});

import LoginPage from "../page-objects/loginPage";
import ShopPage from "../page-objects/shopPage";

describe("Interview exercises (intentionally failing/flaky in exercise mode)", () => {
  const loginPage = new LoginPage();
  const shopPage = new ShopPage();

  beforeEach(() => {
    cy.fixture("users").then(({ validUser }) => {
      loginPage.visit({ exerciseMode: true });
      loginPage.login(validUser.username, validUser.password);
    });
  });

  it("BUG: subtotal should keep cents", () => {
    shopPage.addShirtToCart();
    shopPage.addJeansToCart();
    shopPage.subtotal().should("contain", "75.98");
  });

  it("BUG: remove should delete the clicked row", () => {
    shopPage.addShirtToCart();
    shopPage.addJeansToCart();
    shopPage.removeCartItem(1);
    shopPage.cartTable().should("not.contain", "Slim Jeans");
  });

  it("BUG: changing shirt color should reset logo selection", () => {
    shopPage.selectShirtColor("blue");
    shopPage.selectShirtLogo("Rocket");
    shopPage.selectShirtColor("red");
    shopPage.shirtPreview().should("contain", "No logo selected");
  });

  it("FLAKY: waits fixed time for async table rendering", () => {
    shopPage.selectShirtColor("blue");
    cy.wait(250);
    shopPage.customizationTable().should("be.visible");
  });
});

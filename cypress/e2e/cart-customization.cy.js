import LoginPage from "../page-objects/loginPage";
import ShopPage from "../page-objects/shopPage";

describe("Cart and shirt customization", () => {
  const loginPage = new LoginPage();
  const shopPage = new ShopPage();

  beforeEach(() => {
    cy.fixture("users").then(({ validUser }) => {
      loginPage.visit();
      loginPage.login(validUser.username, validUser.password);
    });
  });

  it("reveals shirt options table only after selecting shirt color", () => {
    cy.getByTestId("shirt-options-table").should("not.exist");
    shopPage.selectShirtColor("blue");
    shopPage.customizationTable().should("be.visible");
    cy.getByTestId("selected-shirt-color").should("contain", "blue");
  });

  it("adds customized shirt and sized jeans to cart and updates subtotal", () => {
    shopPage.selectShirtColor("blue");
    shopPage.selectShirtLogo("Rocket");
    shopPage.shirtPreview().should("contain", "Rocket");
    shopPage.addShirtToCart();

    shopPage.selectJeansSize("M");
    shopPage.addJeansToCart();

    shopPage.cartTable().should("contain", "Classic Shirt");
    shopPage.cartTable().should("contain", "Color: blue");
    shopPage.cartTable().should("contain", "Logo: Rocket");
    shopPage.cartTable().should("contain", "Slim Jeans");
    shopPage.cartTable().should("contain", "Size: M");
    shopPage.subtotal().should("contain", "75.98");
  });
});

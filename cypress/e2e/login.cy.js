import LoginPage from "../page-objects/loginPage";
import ShopPage from "../page-objects/shopPage";

describe("Login flow", () => {
  const loginPage = new LoginPage();
  const shopPage = new ShopPage();

  it("shows error for invalid credentials", () => {
    cy.fixture("users").then(({ invalidUser }) => {
      loginPage.visit();
      loginPage.login(invalidUser.username, invalidUser.password);
      loginPage.errorMessage().should("contain", "Invalid username or password.");
    });
  });

  it("logs in with valid credentials loaded from fixture", () => {
    cy.fixture("users").then(({ validUser }) => {
      loginPage.visit();
      loginPage.login(validUser.username, validUser.password);
      shopPage.shopTitle().should("be.visible");
      shopPage.welcomeText().should("contain", validUser.username);
    });
  });
});

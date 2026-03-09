import LoginPage from "../page-objects/loginPage";
import ShopPage from "../page-objects/shopPage";

describe("Interview candidate scaffold", () => {
  const loginPage = new LoginPage();
  const shopPage = new ShopPage();

  beforeEach(() => {
    cy.fixture("users").then(({ validUser }) => {
      loginPage.visit({ exerciseMode: true });
      loginPage.login(validUser.username, validUser.password);
    });
  });

  it.skip("TODO: stabilize flaky hover customization interactions", () => {
    // TODO candidate:
    // 1) Navigate to shirt hover row.
    // 2) Reveal/trigger hover action reliably without fixed waits.
    // 3) Assert the expected editor panel appears.
    shopPage.exerciseBadge().should("be.visible");
  });

  it.skip("TODO: verify remove button deletes the clicked cart row", () => {
    // TODO candidate:
    // 1) Add at least two items.
    // 2) Remove second row.
    // 3) Assert second row item is gone and first row remains.
    shopPage.cartTable().should("be.visible");
  });

  it.skip("TODO: verify subtotal precision keeps cents", () => {
    // TODO candidate:
    // 1) Add known-priced items.
    // 2) Assert subtotal uses exact decimal total.
    // 3) Add edge-case assertion for cents.
    shopPage.subtotal().should("be.visible");
  });
});

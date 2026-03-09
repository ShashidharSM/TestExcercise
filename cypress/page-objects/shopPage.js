class ShopPage {
  shopTitle() {
    return cy.getByTestId("shop-title");
  }

  welcomeText() {
    return cy.getByTestId("welcome-text");
  }

  exerciseBadge() {
    return cy.getByTestId("exercise-mode-badge");
  }

  selectShirtColor(color) {
    cy.getByTestId("color-select-shirt-001").select(color);
  }

  customizationTable() {
    return cy.getByTestId("shirt-options-table");
  }

  selectShirtLogo(logo) {
    cy.getByTestId("shirt-logo-select").select(logo);
  }

  shirtPreview() {
    return cy.getByTestId("selected-shirt-logo-preview");
  }

  addShirtToCart() {
    cy.getByTestId("add-to-cart-shirt-001").click();
  }

  addJeansToCart() {
    cy.getByTestId("add-to-cart-jeans-001").click();
  }

  selectJeansSize(size) {
    cy.getByTestId("size-select-jeans-001").select(size);
  }

  cartTable() {
    return cy.getByTestId("cart-table");
  }

  subtotal() {
    return cy.getByTestId("cart-subtotal");
  }

  removeCartItem(index) {
    cy.getByTestId(`remove-item-${index}`).click();
  }

  hoverCustomizationTable() {
    return cy.getByTestId("hover-customization-table");
  }

  shirtHoverRow() {
    return cy.getByTestId("hover-row-shirt");
  }

  clickShirtHoverPickColor() {
    cy.getByTestId("hover-action-shirt-color").click({ force: true });
  }

  clickShirtHoverCustomize() {
    cy.getByTestId("hover-action-shirt-customize").click({ force: true });
  }

  shirtHoverEditor() {
    return cy.getByTestId("hover-editor-shirt-color");
  }
}

export default ShopPage;
